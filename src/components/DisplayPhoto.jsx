import { useContext } from "react";
import { MediaContext } from "../utils/Context";

const DisplayPhoto = ({albumId}) => {
    const {mediaList} = useContext(MediaContext)
    

    return (
        <div>
            {/* {mediaList.map(photo => (
                photo.type[0] === 'i' 
                    ? <img key={photo.id} src={photo.r2_url} alt="" />
                    : <video key={photo.id} src={photo.r2_url} controls/>
            ))} */}
        </div>
        
    )
}

export default DisplayPhoto