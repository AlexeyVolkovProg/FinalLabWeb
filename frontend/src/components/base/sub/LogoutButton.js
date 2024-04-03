import {useDispatch} from "react-redux";
import {createLogoutThunk} from "../../../redux/thunks/logoutThunk";
import {Button} from "react-bootstrap";

function LogoutButton() {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(createLogoutThunk())
    }

    return (
        <Button variant="secondary" onClick={handleLogout}>Log out</Button>
    )
}

export default LogoutButton
