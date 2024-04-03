import {configureStore} from '@reduxjs/toolkit'
import loginReducer from '../redux/login/loginSlice'
import pointsReducer from '../redux/points/pointsSlice'
import formReducer from '../redux/form/formSlice'

import {authApi} from "../api/authApi";
import {pointsApi} from "../api/pointsApi";
import {createBrowserHistory} from "history";
import {createRouterMiddleware, createRouterReducerMapObject} from "@lagunovsky/redux-react-router";

export const history = createBrowserHistory()
const routerMiddleware = createRouterMiddleware(history)


export const store = configureStore({
    reducer: {
        login: loginReducer,
        points: pointsReducer,
        form: formReducer,
        ...createRouterReducerMapObject(history),
        [authApi.reducerPath]: authApi.reducer,
        [pointsApi.reducerPath]: pointsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware()
            .prepend(routerMiddleware)
            .concat(authApi.middleware)
            .concat(pointsApi.middleware)
    )
})
