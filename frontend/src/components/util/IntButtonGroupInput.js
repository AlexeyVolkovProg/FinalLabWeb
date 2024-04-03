import {ButtonGroup, Form, ToggleButton} from "react-bootstrap";

function IntButtonGroupInput({validated, name, values, onChange, className, radioValue = null}) {
    return (
        <div>
            <ButtonGroup className={className}>
                {
                    values.map((n, idx) => (
                        <ToggleButton
                            style={{width: 45}}
                            key={idx}
                            id={`radio-${name}-${idx}`}
                            type="radio"
                            name={name}
                            value={n}
                            checked={radioValue === n}
                            onChange={(e) => onChange(e)}
                        >
                            {n}
                        </ToggleButton>
                    ))
                }
            </ButtonGroup>
            <Form.Control
                type="text"
                defaultValue={radioValue}
                isInvalid={radioValue == null && validated}
                required
                className={"d-none " + (radioValue == null ? "invalid" : "")}
            />
            <Form.Control.Feedback type="invalid">
                A value selection in required
            </Form.Control.Feedback>
        </div>
    )
}

export default IntButtonGroupInput
