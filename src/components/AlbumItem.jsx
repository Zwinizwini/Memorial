import styled from "styled-components"
import { useContext } from "react"
import { MediaContext } from "../utils/Context"

const H3 = styled.p`
    margin: 0;
    font-family: 'EB Garamond', Georgia, serif;
    font-size: 19px;
    margin-bottom: 4px;
    color: black;
    margin-left: 10px;
`

const AlbumItem = ({album}) => {
    const {mediaList} = useContext(MediaContext)
    const listeAlbum = mediaList.filter((media) => media.album_id === album.id)
    const nbPhoto = listeAlbum.reduce(
        (acc, media) => media.type[0] === 'i' ? acc+1 : acc
        , 0
    )
    const nbVideo = listeAlbum.length - nbPhoto

    return (
        <>  
            <div style={{display:"flex", alignItems: "center"}}>
                <img src={album.cover} alt="cover de l'album" style={{width: "64px",height:"64px"}} onError={(e) => {e.target.src = listeAlbum[0].r2_url}}/>
                <div>
                    <H3>{album.name}</H3>
                    <div className="info" style={{marginLeft: '10px'}}>{nbPhoto} photos . {nbVideo} vidéos</div>
                </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 20 11" fill="none" style={{marginRight: '10px'}}>
                <path d="M 19 6 L 14 2 V 5 H 2 V 7 H 14 V 10 Z" fill="#9A9590"/>
            </svg>
        </>
    )
}

export default AlbumItem
