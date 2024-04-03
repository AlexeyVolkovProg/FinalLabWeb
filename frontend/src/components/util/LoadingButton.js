import {Button, Spinner} from "react-bootstrap";

function LoadingButton({className = "", variant = "primary"}) {
    return (
        <Button className={className} variant={variant} disabled>
            <Spinner
                className="me-2"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button>
    )
}

export default LoadingButton
