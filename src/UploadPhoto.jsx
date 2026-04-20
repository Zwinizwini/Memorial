import { useState } from 'react'
import { supabase } from './lib/supabase'

const UploadPhoto = () => {
  const [status, setStatus]   = useState('')

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    // 1. Demander l'URL présignée à votre backend
    setStatus('Préparation…')
    const res = await fetch('/api/upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename:    file.name,
        contentType: file.type,
      }),
    })
    const { uploadUrl, publicUrl, key } = await res.json()

    // 2. Envoyer le fichier directement à R2
    setStatus('Upload en cours…')
    await fetch(uploadUrl, {
      method: 'PUT',
      body:   file,
      headers: { 'Content-Type': file.type },
    })

    // 3. Enregistrer l'URL dans Supabase
    setStatus('Enregistrement…')
    await supabase.from('media').insert({
      r2_url:    publicUrl,
      r2_key:    key,
    })

    setStatus('✓ Ajouté !')
  }

  return (
    <div>
      <input type="file" accept="image/*,video/*" onChange={handleUpload} />
      {status && <p>{status}</p>}
    </div>
  )
}

export default UploadPhoto