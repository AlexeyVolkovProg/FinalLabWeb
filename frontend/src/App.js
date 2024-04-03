import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Main} from "./components/main/Main";
import {Register} from "./components/auth/Register";
import UnprotectedComponent from "./components/base/UnprotectedComponent";
import ProtectedComponent from "./components/base/ProtectedComponent";
import {Login} from "./components/auth/Login";
import {ErrorPage} from "./components/util/ErrorPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<ProtectedComponent><Main /></ProtectedComponent>} />
            <Route path="/login" element={<UnprotectedComponent><Login /></UnprotectedComponent>} />
            <Route path="/register" element={<UnprotectedComponent><Register /></UnprotectedComponent>} />
            <Route path="*" element={<ErrorPage />}/>
        </Routes>
    )
}

export default App;
