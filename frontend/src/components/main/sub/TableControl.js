import Form from 'react-bootstrap/Form';
import {Paginator} from "./Paginator";
import {setSize} from "../../../redux/points/pointsSlice";
import {useDispatch} from "react-redux";
import {Button} from "react-bootstrap";
import {useClearPointsMutation} from "../../../api/pointsApi";

export function TableControl() {
    const dispatch = useDispatch()
    const [clearPoints] = useClearPointsMutation()

    const handleSelect = (e) => {
        dispatch(setSize(e.target.value))
    }

    const handleClear = () => {
        clearPoints()
    }

    return (
        <div className="d-flex flex-row justify-content-between flex-wrap gap-2 mb-2">
            <Paginator className="m-0" maxBetweenNumber={3}/>
            <Form.Select
                style={{width: "fit-content"}}
                onChange={handleSelect}
            >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
            </Form.Select>
        </div>
    )
}
