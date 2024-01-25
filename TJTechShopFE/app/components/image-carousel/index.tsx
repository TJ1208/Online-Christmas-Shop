import { ImageModel } from "@/app/models/image"

const ImageCarousel = (images: { images: ImageModel[] }) => {

    return (
        <>
            <div className="Sirv lg:w-1 -z-30" data-options="fullscreen.enable:false;" >
                {
                    images.images.map(image => (
                        <div data-type="zoom" data-src={image.url} key={image.image_id}></div>
                    ))
                }
            </div>
        </>
    )
}

export default ImageCarousel;