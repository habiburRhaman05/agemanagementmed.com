import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { saveLocalUpload } from '@/lib/local-upload'

// Same allowances as the Cloudinary route for images; a modest extra set for
// non-image "files" (PDFs/docs) since the local uploader also has to serve
// the /files bucket, which the Cloudinary route never had to handle.
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml']
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB, matching the Cloudinary route

export async function POST(request: Request) {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const isImage = file.type.startsWith('image/')
    const allowed = isImage ? ALLOWED_IMAGE_TYPES : ALLOWED_FILE_TYPES
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type "${file.type}". Allowed: ${allowed.join(', ')}` },
        { status: 400 },
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 })
    }

    const result = await saveLocalUpload(file)

    return NextResponse.json({
      success: true,
      url: result.url,
      filename: result.filename,
      kind: result.kind,
      size: result.bytes,
    })
  } catch (error) {
    console.error('Local upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 },
    )
  }
}
