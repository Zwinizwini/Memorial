import { useEffect } from "react"


const LecteurVideo = ({mediaList, index, setLecteurView, lecteurView}) => {
    const photo = mediaList[index]


    useEffect(() => {
        if (lecteurView >= 0) {
            document.body.style.overflow = "hidden"
        } 
        return () => {document.body.style.overflow = ""}
    }, [lecteurView])



    return (
        <div className="lecteur-background" onClick={(e) => e.target.className==="lecteur-background" && setLecteurView(null)}>
            <div className="lecteur-nav"><button className="btnFermer" onClick={() => setLecteurView(null)}>x Fermer</button></div>
            <div className="container-lecteur">
                {index-1 >= 0 && <div className="fleche" onClick={() => setLecteurView(index-1)}>‹</div>}
                <div className="lecteur-container">
                    <video key={photo.id} src={photo.r2_url} controls/>
                </div>
                {mediaList.length !== index+1 && <div className="fleche" onClick={() => setLecteurView(index+1)}>›</div>}
            </div>
        </div>
    )
}

export default LecteurVideo
