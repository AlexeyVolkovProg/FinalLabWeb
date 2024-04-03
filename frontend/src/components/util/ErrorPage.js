import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export function ErrorPage() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <div className="fs-1">
                    404
                </div>
                <div className="col m-3">
                    <p className="fs-3"><span className="text-danger">Opps!</span> Page not found</p>
                    <Button variant="success" as={Link} to="/">Home <i className="bi bi-house-door-fill"></i></Button>
                </div>
            </div>
        </div>
    )
}
