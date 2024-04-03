import {Alert} from "react-bootstrap";

export function AlertBar({showErrorMessage = true, setShowErrorMessage = () => {}, errorMessage = "Error"}) {
    if (showErrorMessage) {
        return (
            <Alert
                className="shake mb-2"
                variant="danger"
                onClose={() => {setShowErrorMessage(false)}}
                dismissible
            >
                {errorMessage}
            </Alert>
        )
    }
    return <></>
}