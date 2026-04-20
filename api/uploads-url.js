import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from './lib/r2'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  const { filename, contentType } = req.body

  // Génère une clé unique pour éviter les conflits
  const key = `medias/${uuidv4()}-${filename}`

  const command = new PutObjectCommand({
    Bucket:      import.meta.env.VITE_R2_BUCKET_NAME,
    Key:         key,
    ContentType: contentType,
  })

  // L'URL expire dans 5 minutes
  const uploadUrl = await getSignedUrl(r2, command, { expiresIn: 300 })

  // L'URL publique finale du fichier
  const publicUrl = `${import.meta.env.VITE_R2_PUBLIC_URL}/${key}`

  res.json({ uploadUrl, publicUrl, key })
}