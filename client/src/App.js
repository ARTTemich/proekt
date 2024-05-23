import React, {useContext, useEffect, useState} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";
import LoaderSVG from "./img/logo.svg"


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check()
            .then(data => {
                user.setUser(true)
                user.setIsAuth(true)
                // alert('You successfully authorized')
            })
            .finally(() => setLoading(false))
            .catch(() => {
                console.log("Unauthorized")
            })
    }, [])

    if (loading) {
        return <div className='main-loader'>
            <div className='main-loader-item'>
                <img src={LoaderSVG} alt=""/>
                LOADING...
            </div>
        </div>
    }

        return (
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
            </BrowserRouter>
        );
});

export default App;
