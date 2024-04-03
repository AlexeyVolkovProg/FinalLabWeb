import React from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './app/store'
import App from './App'
import {ReduxRouter} from "@lagunovsky/redux-react-router"
import {history} from "./app/store"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./App.css"

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ReduxRouter history={history}>
                <App/>
            </ReduxRouter>
        </Provider>
    </React.StrictMode>
)
