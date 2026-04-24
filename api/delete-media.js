import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'

export default async function handler(req, res) {
    
  try {
     // doit pas être undefined
    const { r2Key } = req.query

    const r2 = new S3Client({
        region: 'auto',
        endpoint: `https://${process.env.VITE_R2_ACCOUNT_ID}.eu.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: process.env.VITE_R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.VITE_R2_SECRET_ACCESS_KEY,
        },
        responseChecksumValidation: undefined
        })

    // 1. Supprimer le fichier de R2
    await r2.send(new DeleteObjectCommand({
        Bucket: process.env.VITE_R2_BUCKET_NAME,
        Key:    r2Key,
    }))

    res.status(200).json({ success: true })
  } catch (error) {
    console.error("DÉTAIL DU CRASH :", error)
    return res.status(500).json({ error: error.message })
  }
}