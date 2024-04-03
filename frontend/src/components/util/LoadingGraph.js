import {Spinner} from "react-bootstrap";

export function LoadingGraph({width = 100, height = 100}) {
    return (
        <div
            className="shadow border border-1 rounded mb-3 d-flex justify-content-center align-items-center"
            style={{width, height}}>
            <Spinner style={{width: width / 2, height: height / 2}}/>
        </div>
    )
}