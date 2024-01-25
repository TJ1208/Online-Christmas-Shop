import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProductLoad = () => {
    return (
        <>
            <div className="w-full min-h-screen items-center justify-center text-center">
                <FontAwesomeIcon icon={faCircleNotch} spin className="min-h-screen md:w-16 w-10 flex items-center justify-center" />
            </div>
        </>
    )
}

export default ProductLoad;