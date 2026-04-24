import styled, {keyframes} from "styled-components"
import UploadPhoto from "../components/UploadPhoto"
import { supabase } from "../supabase"
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
const slideIn = keyframes`
  from { 
    opacity: 0; 
    transform: translate(-50%) translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translate(-50%) translateY(0); 
  }
`

const ErrorBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;

  background: #F8F7F5;
  border: 1px solid #DDD9D2;
  border-left: 3px solid #0b740b;

  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);

  animation: ${slideIn} 1.5s ease alternate 2 forwards;
`

const ErrorText = styled.p`
  font-family: 'Jost', sans-serif;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: .04em;
  color: #0b740b;
`

const AlbumAjouter = () => {
  const {mediaList, setMediaList} = useContext(MediaContext)
  const [titre, setTitre] = useState('')
  const [cover, setCover] = useState('')
  const [music, setMusic] = useState('')
  const [isAjout, setIsAjout] = useState(false)
  const [r2Key, setR2K] = useState('')
  const [r2Url, setR2U] = useState('')
  const [fileS, setFile] = useState({})
  const navigate = useNavigate()
  const { albumList, setAlbumList } = useContext(AlbumContext)

  useEffect(() => {
    document.title='Ajout Album'
  },[])


  const handleClick = async () => {
    const album = {name: titre, cover: cover, music: music}
    const { data, error } = await supabase
      .from('album')
      .insert(album)
      .select()
    
    if (error) console.error(error)

    const {data: media} = await supabase.from('media').insert({
      r2_url: r2Url,
      r2_key: r2Key,
      type: fileS.type,
      date: new Date(fileS.lastModifiedDate).toISOString(),
      album_id: data[0].id
    }).select()
    const newListMedia = [media[0], ...mediaList]
    setMediaList(newListMedia)
    
    album.id = data[0].id
    const newList = [album, ...albumList]
    setAlbumList(newList)
    setIsAjout(true)
    setTimeout(() => {
      setIsAjout(false)
    }, 3000)
  }

  return (
    <>
      <Header>
        <p className="tag">Albums</p>
        <h1 className="sous-titre" style={{fontSize: "clamp(36px, 5vw, 56px)"}}>Créer un <span>nouvel album</span></h1>
      </Header>
      <div className="content" style={{background: "#f8f7f5"}}>
        <p className="tag" style={{marginBottom: "12px"}}>Photo de couverture</p>
        <UploadPhoto isCover={true} setCover={setCover} setR2K={setR2K} setR2U={setR2U} setFile={setFile}/>
        <label className="tag" style={{marginBottom: "12px"}}>Titre de l'album</label>
        <input 
          type="text" 
          placeholder="Entrez un Titre" 
          className="simpleinput"
          onChange={(e) => setTitre(e.target.value)}
          style={{marginBottom: "30px"}}
        />
        <label className="tag" style={{marginBottom: "12px"}}>Musique de fond</label>
        <input 
          type="text" 
          placeholder="(Optionnel) Lien Youtube" 
          className="simpleinput"
          onChange={(e) => setMusic(e.target.value)}
        />
      </div>
      <DivBtn>
        <BtnRetour onClick={() => navigate(-1)}>← Annuler</BtnRetour>
        {isAjout && <ErrorBanner><ErrorText>Album ajouté avec succes</ErrorText></ErrorBanner>}
        <button className="btnValider"  onClick={() => handleClick()}>Créer l'album</button>
      </DivBtn>
    </>
  )
}

export default AlbumAjouter
