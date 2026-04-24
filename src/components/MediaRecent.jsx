import { useContext } from "react"
import { MediaContext } from "../utils/Context"
import styled from "styled-components"
import '../styles/MediaRecent.css'
import SousTitre from "./SousTitre"
import GrilleItem from "./GrilleItem"



const ContainerHover = styled.div`
    position: relative;
    &:hover p {
        opacity: 1;
    }
`


const MediaRecent = () => {
    const {mediaList} = useContext(MediaContext)
    
    const recentMedia = mediaList.slice(0,5)
    const nbPhoto = mediaList.reduce(
        (acc, media) => media.type[0] === 'i' ? acc+1 : acc
        , 0
    )
    const nbVideo = mediaList.length - nbPhoto
    return (
        <div className="content">
            <div className="header">
                <SousTitre info1={"Souvenirs"} info2={"en images"}/>
                <div className="info">{nbPhoto} photos . {nbVideo} vidéos</div>
            </div>
            <div className="bar"/>
            
            <div className="grille" style={{width:"80%", maxWidth:"1000px"}}>
                {recentMedia.map((photo) => (
                    <div className="containerHover" key={photo.id}>
                        <GrilleItem photo={photo} isImg={photo.type[0]==='i'} isSuppr={false}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MediaRecent
