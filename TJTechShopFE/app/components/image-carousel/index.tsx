import { ImageModel } from "@/app/models/image"

const ImageCarousel = (images: { images: ImageModel[] }) => {

    return (
        <>
            {/* <div className="Sirv" data-options="fullscreen.enable:false; thumbnails.type:bullets;" >
                {
                    images.images.map(image => (
                        <div data-type="zoom" data-src={image.url} key={image.image_id}></div>
                    ))
                }
            </div> */}
            <div className="Sirv" data-options="fullscreen.enable:false; thumbnails.position:left; thumbnails.type:crop;" >
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