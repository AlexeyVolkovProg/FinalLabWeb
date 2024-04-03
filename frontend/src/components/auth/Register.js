import Header from "../base/Header";
import {RegisterForm} from "./RegisterForm";
import {Link} from "react-router-dom";

export function Register() {
    return (
        <div className="vh-100">
            <Header/>
            <div className="h-75 mt-3 flex-column container d-flex justify-content-center align-items-center">
                <div className="h3 text-center">
                    Sign up
                </div>
                <RegisterForm/>
                <div className="text-muted text-center mt">
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    )
}
