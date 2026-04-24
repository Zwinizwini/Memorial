import { useContext } from "react"
import styled from "styled-components"
import { MediaContext } from "../utils/Context"
import { supabase } from "../supabase"

const HoverText = styled.p`
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 10px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.651) 50%, transparent 100%);
    color: rgba(255, 255, 255, 0.788);
    text-transform: uppercase;
    letter-spacing: .14em;
    font-size: 11px;
    transition: all .2s ease-in-out;

`

const SupprMedia = async (mediaId, r2Key, mediaList, setMediaList) => {
    await fetch(`/api/delete-media?r2Key=${r2Key}`, { method: 'DELETE' })
    await supabase
        .from('media')
        .delete()
        .eq('id', mediaId)
    setMediaList(mediaList.filter(media => media.id !== mediaId))
}

const GrilleItem = ({photo, isImg, isSuppr}) => {

    const {mediaList, setMediaList} = useContext(MediaContext)
    const date = new Date(photo.date)
    const month = ["Janvier", "Fevrier", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"]

    return (
        <>
            {isImg ? <img key={photo.id} src={photo.r2_url} alt="" /> : <video key={photo.id} src={photo.r2_url}/>}
            {!isSuppr 
                ? <HoverText>{month[date.getMonth()]} {date.getFullYear()}</HoverText>
                : <div className="divHover">
                    <p>{month[date.getMonth()]} {date.getFullYear()}</p>
                    <button className="btnSuppr" onClick={() => SupprMedia(photo.id, photo.r2_key, mediaList, setMediaList)}>Supprimer</button>
                </div>
            }
            
        </>
    )
}

export default GrilleItem
