import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINERY_NAME,
  api_key: process.env.CLOUDINERY_API_KEY,
  api_secret: process.env.CLOUDINERY_API_SECRET || process.env.CLOUDINERY_API_SECRECT,
})

export { cloudinary }

export type UploadResult = {
  url: string
  secure_url: string
  public_id: string
  format: string
  width: number
  height: number
  bytes: number
}

export async function uploadImage(
  file: File,
  folder = 'uploads'
): Promise<UploadResult> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { quality: 'auto', fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          reject(new Error(error.message || 'Cloudinary upload failed'))
        } else if (!result) {
          reject(new Error('Cloudinary returned empty result'))
        } else {
          resolve({
            url: result.url,
            secure_url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
          })
        }
      }
    )

    uploadStream.end(buffer)
  })
}
