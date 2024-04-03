import {Form} from "react-bootstrap";

export function IntTextInput({validated, value, className, name, onChange, maxValue, minValue, maxLength=15}) {
    const isValid = !(!value || value.length === 0 || isNaN(value) || value < minValue || value > maxValue)
    return (
        <div>
            <Form.Control
                isInvalid={!isValid && validated}
                className={className + (!isValid ? " invalid" : "")}
                type="text"
                name={name}
                onChange={(e) => onChange(e)}
                placeholder={`(${minValue}..${maxValue})`}
                autoComplete="off"
                maxLength={maxLength}
            />
            <div className="invalid-feedback">
                Y cord is number between -5 and 3
            </div>
        </div>
    )    
}
