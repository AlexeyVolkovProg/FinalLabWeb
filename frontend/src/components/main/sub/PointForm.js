import {Button, Form, FormGroup} from "react-bootstrap";
import IntButtonGroupInput from "../../util/IntButtonGroupInput";
import {usePostHitMutation} from "../../../api/pointsApi";
import {useDispatch, useSelector} from "react-redux";
import {resetForm, setValue} from "../../../redux/form/formSlice";
import {selectFormData} from "../../../redux/form/formSelectors";
import {IntTextInput} from "../../util/IntTextInput";
import {useState} from "react";
import {AlertBar} from "../../util/AlertBar";

export function PointForm() {
    const dispatch = useDispatch()
    const [postHit] = usePostHitMutation()
    const formData = useSelector(selectFormData)
    const [validated, setValidated] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleReset = () => {
        setValidated(false)
        dispatch(resetForm())
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (name === "y") {
            value = value.replaceAll(",", ".")
        }
        dispatch(setValue({name: name, value: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = !e.target.getElementsByClassName("invalid").length
        try {
            if (isValid) {
                setValidated(false)
                await postHit(formData).unwrap()
            } else {
                setValidated(true)
            }
        } catch (err) {
            setErrorMessage("Sending error occurred")
            setShowErrorMessage(true)
        }
    }

    return (
        <Form noValidate onSubmit={handleSubmit} onReset={handleReset}
            className="user-select-none shadow border border-1 rounded p-2  mt-3"
            style={{
                height: "fit-content",
                width: 350
            }}
        >
            <AlertBar
                errorMessage={errorMessage}
                setShowErrorMessage={setShowErrorMessage}
                showErrorMessage={showErrorMessage}
            />
            <FormGroup className="mb-2 border border-1 rounded p-2 shadow-sm">
                <Form.Label>R</Form.Label>
                <IntButtonGroupInput validated={validated} name="r" values={[1, 2, 3, 4, 5]} radioValue={formData.r} onChange={handleChange} />
            </FormGroup>
            <FormGroup className="mb-2 border border-1 rounded p-2 shadow-sm">
                <Form.Label>X</Form.Label>
                <IntButtonGroupInput validated={validated} name="x" values={[-2,-1.5, -1, 0, 1.5, 1, 2]} radioValue={formData.x} onChange={handleChange} />
            </FormGroup>
            <FormGroup className="mb-2 border border-1 rounded p-2 shadow-sm">
                <Form.Label>Y</Form.Label>
                <IntTextInput validated={validated} value={formData.y} minValue={-3} maxValue={5} name={"y"} onChange={handleChange} />
            </FormGroup>
            <div className="d-flex flex-row">
                <Button className="me-2 w-25" variant="secondary" type="submit">Submit</Button>
                <Button className="w-25" variant="danger" type="reset">Reset</Button>
            </div>
        </Form>
    )
}
