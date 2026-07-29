import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/auth'
import { cloudinary } from '@/lib/cloudinary'

// Allowed MIME types for icons/favicons
const ALLOWED_TYPES = [
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
  'image/ico',
]

// Allowed file extensions
const ALLOWED_EXTENSIONS = ['.ico', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif']

// Max file size: 5MB
const MAX_SIZE = 5 * 1024 * 1024

// Cloudinary folder for favicons
const CLOUDINARY_FOLDER = 'favicons'

function getExtension(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  return ext ? `.${ext}` : ''
}

function isValidFileType(file: File): boolean {
  // Check MIME type
  if (ALLOWED_TYPES.includes(file.type)) return true
  // Fallback: check extension
  const ext = getExtension(file.name)
  return ALLOWED_EXTENSIONS.includes(ext)
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const admin = await getCurrentAdmin()
    if (!admin) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type - .ico MUST be allowed
    if (!isValidFileType(file)) {
      const ext = getExtension(file.name).slice(1).toUpperCase() || 'unknown'
      return NextResponse.json(
        {
          error: `Invalid file type "${ext}". Allowed: ${ALLOWED_EXTENSIONS.map((e) => e.slice(1).toUpperCase()).join(', ')}`,
        },
        { status: 400 },
      )
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is 5MB.` },
        { status: 400 },
      )
    }

    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary with fixed filename 'favicon'
    // overwrite: true handles replacing the old file automatically
    const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: CLOUDINARY_FOLDER,
          public_id: 'favicon', // Fixed name so it's always /favicon.ext
          overwrite: true,
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(new Error(error.message || 'Cloudinary upload failed'))
          } else if (!result) {
            reject(new Error('Cloudinary returned empty result'))
          } else {
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            })
          }
        }
      )
      uploadStream.end(buffer)
    })

    console.log(`Favicon uploaded to Cloudinary: ${result.public_id}`)

    // Return the Cloudinary URL
    return NextResponse.json({
      success: true,
      url: result.secure_url,
      filename: 'favicon',
      size: file.size,
      type: file.type || getExtension(file.name).slice(1),
    })
  } catch (error) {
    console.error('Favicon upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 },
    )
  }
}
