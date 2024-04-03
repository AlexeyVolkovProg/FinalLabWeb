import {useDispatch} from "react-redux";
import {push} from "@lagunovsky/redux-react-router";
import {Button, Form} from "react-bootstrap";
import LoadingButton from "../util/LoadingButton";
import {useState} from "react";
import {PasswordInput} from "../util/PasswordInput";

import {useRegisterMutation} from "../../api/authApi";
import {AlertBar} from "../util/AlertBar";


export function RegisterForm() {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [register, {isLoading}] = useRegisterMutation()

    const onUsernameChanged = (e) => {
        setUsername(e.target.value);
    }

    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (password.length < 6) {
                setErrorMessage("Password is too short!")
                setShowErrorMessage(true)
                return
            }
            await register({username: username, password: password}).unwrap()
            dispatch(push("/login"))
        } catch (err) {
            if (err.data && err.data.status) {
                setErrorMessage(err.data.message)
            } else {
                setErrorMessage("Unexpected error occurred!")
            }
            setShowErrorMessage(true)
        }
    }

    return (
        <Form style={{width: 400}}
              className="m-3 border border-1 shadow-lg rounded p-3"
              onSubmit={handleSubmit}
        >
            <AlertBar
                errorMessage={errorMessage}
                setShowErrorMessage={setShowErrorMessage}
                showErrorMessage={showErrorMessage}
            />
            <Form.Group className="mb-3">
                <Form.Label className="text-muted">Username</Form.Label>
                <Form.Control autoFocus required maxLength={20} type="text" name="username"
                              onChange={onUsernameChanged}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="text-muted">Password</Form.Label>
                <PasswordInput onChange={onPasswordChanged} value={password}/>
            </Form.Group>
            <Form.Group>
                {isLoading ?
                    <LoadingButton className="w-100" variant="success"/> :
                    <Button className="w-100" variant="success" type="submit"
                            disabled={username === "" || password === ""}>Sign up</Button>
                }
            </Form.Group>
        </Form>
    )
}
