import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import Login from "./component/Login.jsx";
import Signup from "./component/Signup.jsx";
import Home from "./component/Home.jsx";
import {ClientList} from "./component/ClientList.jsx";
import {Provider} from "react-redux";
import {store} from "./app/store.js";
import Dashboard from "./component/Dashboard.jsx";


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="" element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="clients" element={<Dashboard/>}/>
        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={routes}/>
    </Provider>,
)
