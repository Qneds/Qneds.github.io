import {
    BrowserRouter as Router, NavLink
  } from "react-router-dom";
import { React, Component, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from '../../firebase';

import User from "../../contexts/User";

import "../../styles/divs.css"

const Login = () => {

    const {user, setUser} = useContext(User);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginRedirect, setLoginRedirect] = useState(false);
    const [registerRedirect, setRegisterRedirect] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Podano nieprawidłowe dane");

    
    const login = () => {   
        auth.signInWithEmailAndPassword(email, password)
        .then(loggedUser => {
            setUser(loggedUser.user);
            setLoginRedirect(true);
            console.log(user);
        })
        .catch(error =>{
            setEmail("");
            setPassword("");
            setShowError(true);
            console.log(error);
        });
    }   

    const register = () => {
        setRegisterRedirect(true);
    }

    const handleEmail = (e) =>{
        setEmail(e.target.value);
        if(showError === true)
            setShowError(false);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value);
        if(showError === true)
            setShowError(false);
    }


    if(loginRedirect){
        return <Redirect to="/main-page"/>
    }

    if(registerRedirect){
        return <Redirect to="/register"/>
    }

    return (
        <>
            <div className="log-reg-con">
                <div className="log-reg-tit">
                    <h2>
                        Logowanie
                    </h2>
                </div>
                <div className="log-reg-div">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm2">Email:</span>
                        </div>
                        <input type="text" name="descSearch" value={email} onChange={handleEmail} id="1" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm2">Hasło:</span>
                        </div>
                        <input type="password" name="tagSearch" value={password} onChange={handlePassword} id="2" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div>
                        {showError && <h6 style={{color: "red"}}>{errorMessage}</h6> }
                    </div>
                </div>
        
                <div className="buttons-form">
                    <div className="btn-div-frame space-app buttons-page-div m-*-auto text-center" style={{margin: 'auto'}}>
                        <button className="btn border-btn btn-success m-2" onClick={login} style={{margin: 'auto'}}>Zaloguj się</button>
                        <button className="btn border-btn btn-select  btn-secondary m-2" onClick={register} style={{margin: 'auto'}}>Zarejestruj się</button>
                    </div>
                </div>
            </div>
        </>
    );  
}
export default Login;