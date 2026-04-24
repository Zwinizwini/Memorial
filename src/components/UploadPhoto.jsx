import { useContext, useRef, useState } from 'react'
import { supabase } from '../supabase'
import { AlbumContext, MediaContext } from '../utils/Context'

const UploadPhoto = ({isCover, setCover, albumId, setR2U, setR2K, setFile}) => {
  const [status, setStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {mediaList, setMediaList} = useContext(MediaContext)
  const inputRef = useRef(null)

  async function handleUpload(e) {
    setIsLoading(true)
    const file = e.target.files[0]
    if (!file) return

    // 1. Demander l'URL présignée à votre backend
    const res = await fetch('/api/uploads-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename:    file.name,
        contentType: file.type,
      }),
    })
    const { uploadUrl, publicUrl, key } = await res.json()


    // 2. Envoyer le fichier directement à R2
    await fetch(uploadUrl, {
      method: 'PUT',
      body:   file,
    })

    // 3. Enregistrer l'URL dans Supabase
    if (!isCover) {
      const {data} = await supabase.from('media').insert({
        r2_url: publicUrl,
        r2_key: key,
        type: file.type,
        date: new Date(file.lastModifiedDate).toISOString(),
        album_id: albumId
      }).select()
      const newList = [data[0], ...mediaList]
      setMediaList(newList)
    } else {
      setFile(file)
      setR2U(publicUrl)
      setR2K(key)
      setCover(publicUrl)
    }


    setStatus(true)
    setIsLoading(false)
  }

  return (
    isCover ? 
      <div className='new-album' onClick={() => inputRef.current.click()}>
        <div className='btnplus'>+</div>
        <p>{!status ? "Choisir une photo" : "Photo Ajouté"}</p>
        {isLoading && <div className="loader"></div>}
        <input type="file" accept="image/*,video/*" ref={inputRef} onChange={(e) => handleUpload(e)} style={{display:"none"}}/>
      </div> 
    : 
      <>
        <div className='new-album' onClick={() => inputRef.current.click()} style={{margin: 'auto',marginBottom:"30px"}}>
          <div className='btnplus'>+</div>
          <p>{!status ? "Ajouter des photos ou vidéos à cet album" : "Contenue Ajouté"}</p>
          <p>Glissez vos fichiers ici ou cliquez pour parcourir</p>
          {isLoading && <div className="loader"></div>}
          <input type="file" accept="image/*,video/*" ref={inputRef} onChange={(e) => handleUpload(e)} style={{display:"none"}}/>
        </div>
        <div className="bar2" style={{width:"100%"}}></div>
      </>
  )
}

export default UploadPhoto