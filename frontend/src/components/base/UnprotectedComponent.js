import {useDispatch, useSelector} from "react-redux";
import {selectToken} from "../../redux/login/loginSelectors";
import {push} from "@lagunovsky/redux-react-router";

function UnprotectedComponent(props) {
    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    if (token) {
        dispatch(push('/'))
        return <></>
    }
    return (
        <div>
            {props.children}
        </div>
    )
}

export default UnprotectedComponent
