import Header from "../base/Header";
import {LoginForm} from "./LoginForm";
import {Link} from "react-router-dom";

export function Login() {
    return (
        <div className="vh-100">
            <Header/>
            <div className="h-75 mt-3 container flex-column d-flex justify-content-center align-items-center">
                <div className="h3 text-center">
                    Sign in
                </div>
                <LoginForm/>
                <div className="text-muted text-center mt">
                    Don't have an account yet? <Link to="/register">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
