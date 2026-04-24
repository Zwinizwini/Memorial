import React, { useContext, useRef, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { AlbumContext, MediaContext } from "../utils/Context"
import GrilleItem from "../components/GrilleItem"
import UploadPhoto from '../components/UploadPhoto'
import LecteurImg from "../components/LecteurImg"
import Carrousel from "../components/Carrousel"
import SousTitre from "../components/SousTitre"
import LecteurVideo from "../components/LecteurVideo"
import ReactPlayer from 'react-player'
import Volume from "../components/Volume"

const ProfilDiv = styled.div`
  border-bottom: 1px solid #DDD9D2;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 20px 40px;

  & h1 {
    font-family: 'EB Garamond', Georgia, serif;
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 400;
    margin: 0;
    margin-bottom: 16px;
    color: #2a2825;
  }
`

const Date = styled.p`
  font-size: 13px;
  letter-spacing: .25rem;
  color: #9A9590;
  margin-bottom: 40px;
  font-family: 'Jost', sans-serif;
`

const scrollBottom = e => {
  e.current.scrollIntoView({
    behavior: "smooth"
  });
};



const Album = () => {
  const scrollRef = useRef(null)
  const {id, name} = useParams()
  const {albumList} = useContext(AlbumContext)
  const {mediaList, loading} = useContext(MediaContext)
  const [lecteurView, setLecteurView] = useState(null)
  const [lecteurVideo, setLecteurVideo] = useState(null)
  const [muted, setMuted] = useState(false)

  const music = albumList.find(album => album.id === parseInt(id))?.music ?? null
  
  useEffect(() => {
    document.title=name
    window.scrollTo(0,0)
  },[])

  if (loading) return <div className="loader"></div>

  const mediaAlbum = mediaList.filter(media => media.album_id === parseInt(id))
  if (mediaAlbum.length > 0) {
    const nbPhoto = mediaAlbum.reduce(
      (acc, media) => media.type[0] === 'i' ? acc+1 : acc
      , 0
    )
    const nbVideo = mediaAlbum.length - nbPhoto

    const mediaPhotos = mediaAlbum.filter(media => media.type[0] === 'i')
    const mediaVideo = mediaAlbum.filter(media => media.type[0] !== 'i')
    return (
    <>
    
      {music && <>
        <Volume muted={muted} setMuted={setMuted}/>
        <ReactPlayer 
          src={music}
          loop={true}
          playing={true}
          muted={muted}
        />
      </>}
      <ProfilDiv>
        <div>
          <h1>{name}</h1>
          <p className="tag">.{nbPhoto} photos    .{nbVideo} vidéos</p>
        </div>
        <button className="btnAjout" onClick={() => scrollBottom(scrollRef)}>+ Ajouter des souvenirs</button>
      </ProfilDiv>
      <div className="content" style={{background:"#F8F7F5", padding:"0"}}>
        <div className="container-carousel">
          <Carrousel mediaList={mediaPhotos}/>
        </div>
        
        {nbPhoto > 0 && <div className="content-photos">
          <SousTitre info1={"Photos"}/>
            <div className="grille">
              {mediaPhotos.map((photo, index) => (
                <div className="containerHover" key={photo.id} onClick={(e) => {
                  e.target.className !== "btnSuppr" && setLecteurView(index)
                }}>
                  <GrilleItem photo={photo} isImg={photo.type[0]==='i'} index={index} isSuppr={true}/>
                </div>
              ))}
              {lecteurView !== null && <LecteurImg mediaList={mediaPhotos} index={lecteurView} setLecteurView={setLecteurView} lecteurView={lecteurView}/>}
            </div>
          </div>
        }

        {nbVideo > 0 && <div className="content-video">
          <SousTitre info1={"Vidéos"}/>
            <div className="grille" style={{width:"80%", maxWidth:"1000px"}}>
              {mediaVideo.map((photo, index) => (
                <div className="containerHover" key={photo.id} onClick={(e) => {
                  e.target.className !== "btnSuppr" && setLecteurVideo(index)
                }}>
                  <GrilleItem photo={photo} isImg={photo.type[0]==='i'} index={index} isSuppr={true}/>
                </div>
              ))}
              {lecteurVideo !== null && <LecteurVideo mediaList={mediaVideo} index={lecteurVideo} setLecteurView={setLecteurVideo} lecteurView={lecteurVideo}/>}
            </div>
          </div>
        }


      </div>
      <div ref={scrollRef}>
        <UploadPhoto isCover={false} albumId={parseInt(id)}/>
      </div>
    </>
    )
  } else {
    return (
      <UploadPhoto isCover={false} albumId={parseInt(id)}/>
    )
  }


  
}

export default Album
