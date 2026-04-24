import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import AutoHeight from "embla-carousel-auto-height"
import { useEffect, useState } from "react"

const Carrousel = ({mediaList}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()], [AutoHeight()])
    const [lecteurView, setLecteurView] = useState(null)
    const tailleList = mediaList.length

    useEffect(() => {
        if (!emblaApi) return
        if (tailleList > 1) emblaApi.plugins().autoplay?.play()
    }, [emblaApi])

    useEffect(() => {
        if (lecteurView) {
            document.body.style.overflow = "hidden"
        } 
        return () => {document.body.style.overflow = ""}
    }, [lecteurView])

    return (
        <>
            <div className="embla" onClick={() => setTimeout(() => tailleList > 1 && emblaApi.plugins().autoplay?.play(), 1000)}>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {mediaList.map((photo, index) => (
                            photo.type[0]==='i' && <div className="embla__slide" key={photo.id} onClick={() => setLecteurView(index)}><img src={photo.r2_url} alt="" /> </div>
                        ))}
                    </div>
                </div>
            </div>
            {lecteurView !== null && 
                <div className="lecteur-background" onClick={(e) => e.target.className==="lecteur-background" && setLecteurView(null)}>
                    <div className="lecteur-container">
                        {mediaList[lecteurView].type[0]==='i' && <img key={mediaList[lecteurView].id} src={mediaList[lecteurView].r2_url} alt="" />}
                    </div>
                </div>
            }
        </>
    )
}

export default Carrousel
