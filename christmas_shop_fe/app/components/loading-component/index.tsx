import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LoadingCompoent = () => (
    <div className="flex flex-col items-center justify-center p-5">
        <p>Loading...</p>
        <FontAwesomeIcon icon={faSpinner} spin className="mt-10 h-5 text-amber-600" />
    </div>
)