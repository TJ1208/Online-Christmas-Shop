"use client"

import { ImageModel } from "@/app/models/image"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const ImageCarousel = (images: { images: ImageModel[] }) => {
    const [carouselCounter, setCarouselCounter] = useState<number>(0)

    return (
        <>
            <style jsx global>{`
          .Sirv 
            width: 500px;
            height: 500px;
          `}
            </style>
            <div className="Sirv lg:w-1 -z-30" data-options="fullscreen.enable:false;">
                {
                    images.images.map(image => (
                        <div data-type="zoom" data-src={image.url}></div>
                    ))
                }
            </div>
        </>
    )
}

export default ImageCarousel;