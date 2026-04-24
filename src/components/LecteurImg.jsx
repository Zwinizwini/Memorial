import { useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { NextButton, PrevButton, usePrevNextButtons } from "./CarrouselArrow"


const LecteurImg = ({mediaList, index, setLecteurView, lecteurView}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true})

    const mediaDisplayList = [...mediaList.slice(index), ...mediaList.slice(0,index)]

    useEffect(() => {
        if (lecteurView >= 0) {
            document.body.style.overflow = "hidden"
        } 
        return () => {document.body.style.overflow = ""}
    }, [lecteurView])

    const {prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)


    return (
        <div className="lecteur-background" onClick={(e) => e.target.className==="lecteur-background" && setLecteurView(null)}>       
            <div className="lecteur-nav"><button className="btnFermer" onClick={() => setLecteurView(null)}>x Fermer</button></div>
            <div className="container-lecteur">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <div className="embla">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                        {mediaDisplayList.map((photo) => (
                            photo.type[0]==='i' && <div className="embla__slide" key={photo.id}>
                                <img key={photo.id} src={photo.r2_url} alt="" />
                            </div>
                            ))}
                        </div>
                    </div>      
                </div>
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
        </div>
    )
}

export default LecteurImg
