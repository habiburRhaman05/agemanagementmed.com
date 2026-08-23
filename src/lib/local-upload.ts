import { randomBytes } from 'node:crypto'
import { mkdir, writeFile, access } from 'node:fs/promises'
import path from 'node:path'

/**
 * "Local Upload" — the third admin upload method, alongside Cloudinary and
 * raw URL. Saves the file directly onto this app's own filesystem instead of
 * a third-party service. Only safe on a persistent host with a writable
 * filesystem (this app runs on a Hostinger VPS, not serverless — a Vercel-
 * style read-only runtime filesystem would silently fail/not persist here).
 *
 * Layout, as specified: everything under one shared root, split by kind —
 *   public/themes/default/images/<filename>  (image/* mime types)
 *   public/themes/default/files/<filename>   (everything else)
 */

const PUBLIC_ROOT = path.resolve(process.cwd(), 'public', 'themes', 'default')
const IMAGES_DIR = path.join(PUBLIC_ROOT, 'images')
const FILES_DIR = path.join(PUBLIC_ROOT, 'files')

export interface LocalUploadResult {
  url: string
  filename: string
  kind: 'image' | 'file'
  bytes: number
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

/** original.jpg -> original.jpg, or original-a1b2c3.jpg if original.jpg is already taken. Never overwrites an existing file. */
async function uniqueFilename(dir: string, originalName: string): Promise<string> {
  const ext = path.extname(originalName)
  const base = path.basename(originalName, ext)
  const safeBase = base.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'file'
  const safeExt = ext.replace(/[^a-zA-Z0-9.]+/g, '').toLowerCase() || ''

  let candidate = `${safeBase}${safeExt}`
  if (!(await fileExists(path.join(dir, candidate)))) return candidate

  // Collision — append a short random suffix, matching Cloudinary's own
  // approach of never overwriting an existing asset under the same name.
  for (let attempt = 0; attempt < 5; attempt++) {
    const suffix = randomBytes(4).toString('hex')
    candidate = `${safeBase}-${suffix}${safeExt}`
    if (!(await fileExists(path.join(dir, candidate)))) return candidate
  }
  // Astronomically unlikely fallback: timestamp guarantees uniqueness.
  return `${safeBase}-${Date.now()}${safeExt}`
}

export async function saveLocalUpload(file: File): Promise<LocalUploadResult> {
  const isImage = file.type.startsWith('image/')
  const dir = isImage ? IMAGES_DIR : FILES_DIR
  const urlPrefix = isImage ? '/themes/default/images' : '/themes/default/files'

  await mkdir(dir, { recursive: true })

  const filename = await uniqueFilename(dir, file.name)
  const arrayBuffer = await file.arrayBuffer()
  await writeFile(path.join(dir, filename), Buffer.from(arrayBuffer))

  return {
    url: `${urlPrefix}/${filename}`,
    filename,
    kind: isImage ? 'image' : 'file',
    bytes: arrayBuffer.byteLength,
  }
}
