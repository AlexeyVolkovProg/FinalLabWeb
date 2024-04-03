import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function LoginButton() {
    return (
        <Button variant="secondary" as={Link} to="/login">Sign in</Button>
    )
}

export default LoginButton
