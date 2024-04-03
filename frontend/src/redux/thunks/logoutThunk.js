import {push} from "@lagunovsky/redux-react-router"
import {loginResult} from "../login/loginSlice"

export const createLogoutThunk = () => async function (dispatch) {
    dispatch(loginResult(null))
    localStorage.removeItem("token")
    dispatch(push("/login"))
}
