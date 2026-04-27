import styled from "styled-components"
import UploadPhoto from "../components/UploadPhoto"
import { supabase } from "../supabase"
import { useContext, useState, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { AlbumContext, MediaContext } from "../utils/Context"

const Header = styled.div`
  text-align: center;
  padding: 64px;
  border-bottom: 1px solid #DDD9D2;
`

const DivBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;
  padding: 20px;
`

const BtnRetour = styled.button`
  background: transparent;
  border: none;
  color: #7e7b78;
  font-size: 11px;
  letter-spacing: .16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s;
  &:hover {
    color: #2A2825;
  }
  &:active {
    transform: scale(.9);
  }
`


const AlbumModif = () => {
    const { albumList, saveAlbumList} = useContext(AlbumContext)
    const {id} = useParams()
    const { state } = useLocation()
    const [titre, setTitre] = useState(state.name)
    const [cover, setCover] = useState(state.cover)
    const [music, setMusic] = useState(state.music)

    const navigate = useNavigate()

  useEffect(() => {
    document.title='Modifier Album'
  },[])

  const handleClick = async () => {
    const updatedAlbum = {name: titre, cover: cover, music: music}
    const { error } = await supabase
      .from('album')
      .update(updatedAlbum)
      .eq('id', parseInt(id))
    
    if (error) console.error(error)
    
    const newList = albumList.map(album => 
        album.id === parseInt(id) ? {
            ...album,
            name: titre,
            cover: cover,
            music: music
        } : album
    )
    saveAlbumList(newList)
    navigate(-1)
  }

  return (
    <>
      <Header>
        <p className="tag">Albums</p>
        <h1 className="sous-titre" style={{fontSize: "clamp(36px, 5vw, 56px)"}}>Modifier <span>l'album</span></h1>
      </Header>
      <div className="content" style={{background: "#f8f7f5"}}>
        <p className="tag" style={{marginBottom: "12px"}}>Photo de couverture</p>
        <UploadPhoto albumId={parseInt(id)} setCover={setCover} changeCover={true}/>
        <label className="tag" style={{marginBottom: "12px"}}>Titre de l'album</label>
        <input 
          type="text" 
          placeholder="Entrez un Titre" 
          className="simpleinput"
          onChange={(e) => setTitre(e.target.value)}
          style={{marginBottom: "30px"}}
          value={titre}
        />
        <label className="tag" style={{marginBottom: "12px"}}>Musique de fond</label>
        <input 
          type="text" 
          placeholder="(Optionnel) Lien Youtube" 
          className="simpleinput"
          onChange={(e) => setMusic(e.target.value)}
          value={music}
        />
      </div>
      <DivBtn>
        <BtnRetour onClick={() => navigate(-1)}>← Annuler</BtnRetour>
        <button className="btnValider"  onClick={() => handleClick()}>Modifier l'album</button>
      </DivBtn>
    </>
  )
}

export default AlbumModif
