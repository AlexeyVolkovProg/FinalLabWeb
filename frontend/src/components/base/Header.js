import {Form, Navbar} from "react-bootstrap";
import AuthButton from "./sub/AuthButton";

function Header() {
    return (
        <Navbar bg="light" variant="light" className="d-flex flex-row justify-content-center flex-wrap">
            <Navbar.Brand className="m-1" href="/">SE.ITMO</Navbar.Brand>
            <div className="d-flex flex-row w-75 justify-content-evenly flex-wrap">
                <div className="navbar-text">Alexey Volkov</div>
                <div className="navbar-text">P3213</div>
                <div className="navbar-text"></div>
            </div>
            <Form inline="true" className="">
                <AuthButton/>
            </Form>
        </Navbar>
    )
}

export default Header
