import {useSelector} from "react-redux";
import {selectToken} from "../../../redux/login/loginSelectors";
import LogoutButton from "./LogoutButton";
import React from "react";
import LoginButton from "./LoginButton";

function AuthButton() {
    const token = useSelector(selectToken)

    if (token === null) {
        return (
            <LoginButton />
        )
    } else {
        return (
            <LogoutButton />
        )
    }
}

export default AuthButton
