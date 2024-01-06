import React from "react";
import {Outlet,Navigate} from 'react-router-dom'

const AuthRequired = ()=>{
    const isLoggedIn = !(localStorage.getItem('jwtToken')==null);

    if(isLoggedIn==false){
        console.log(isLoggedIn)
        return <Navigate to='/login' />
    }
    return <Outlet/>
}

export default AuthRequired;