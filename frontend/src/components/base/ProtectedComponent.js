import {useDispatch, useSelector} from "react-redux";
import {selectToken} from "../../redux/login/loginSelectors";
import {push} from "@lagunovsky/redux-react-router";

function ProtectedComponent(props) {
    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    if (token === null) {
        dispatch(push('/login'))
        return <></>
    }
    return (
        <div>
            {props.children}
        </div>
    )
}

export default ProtectedComponent
