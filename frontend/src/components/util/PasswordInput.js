import {useState} from "react";
import {Form, InputGroup} from "react-bootstrap";

export const PasswordInput = ({onChange, value}) => {
    const [isShown, setIsShown] = useState(false);

    const toggleShown = () =>  {
        setIsShown(!isShown);
    }

    return (
        <InputGroup>
            <Form.Control name="password" type={isShown ? "text" : "password"} required maxLength={20}
                          onChange={onChange} value={value}/>
            <span className="input-group-text" onClick={toggleShown}>
                <i className={isShown ? "bi bi-eye-slash" : "bi bi-eye"} aria-hidden="true"/>
            </span>
        </InputGroup>
    )
}
