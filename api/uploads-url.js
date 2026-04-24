import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  try {
    // 1. On initialise le client ICI, à l'intérieur du handler
    // Comme ça, si ça crash, le try/catch l'attrapera !
    const r2 = new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.VITE_R2_ACCOUNT_ID}.eu.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.VITE_R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.VITE_R2_SECRET_ACCESS_KEY,
      },
      responseChecksumValidation: undefined
    })

    const { filename, contentType } = req.body
    const key = `medias/${uuidv4()}-${filename}`

    const command = new PutObjectCommand({
        Bucket: process.env.VITE_R2_BUCKET_NAME,
        Key: key,
        ContentType: contentType, // Doit correspondre EXACTEMENT au file.type du fetch
    })

    const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 300 })
    
    return res.status(200).json({ 
      uploadUrl, 
      publicUrl: `${process.env.VITE_R2_PUBLIC_URL}/${key}`,
      key 
    })

  } catch (error) {
    // 2. ICI on va enfin voir la vraie erreur dans le terminal !
    console.error("DÉTAIL DU CRASH :", error)
    return res.status(500).json({ error: error.message })
  }
}