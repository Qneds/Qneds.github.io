
import { React, Component, useState } from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';

import "../../styles/divs.css"

import { auth, addUserData } from '../../firebase';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [mainRedirect, setMainRedirect] = useState(false);

    const [diffrentPasswordError, setDiffrentPasswordError] =  useState(false);
    const [diffrentPasswordErrorMessage, setDiffrentPasswordErrorMessage] =  useState("Podane hasła są różne");

    const [emptyFieldError, setEmptyFieldError] =  useState(false);
    const [emptyFieldErrorMessage, setEmptyFieldErrorMessage] =  useState("Pola z (*) są obowiązkowe");

    const [serverError, setServerError] =  useState(false);
    const [serverErrorMessage, setServerErrorrMessage] =  useState("Nie udało się założyć konta");

    const register = () => {
        
        
        if(firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "" || passwordRepeat.trim() === ""){
            setEmptyFieldError(true);
            return;
        }

        if(diffrentPasswordError)
            return;
        else {
            if(passwordRepeat !==  password){
                setDiffrentPasswordError(true);
                return;
            }
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then(() =>{
            auth.signInWithEmailAndPassword(email, password)
                .then(loggedUser =>{
                    loggedUser.user.updateProfile({
                        displayName: firstName + " " + lastName
                    });


                    setMainRedirect(true);
                    addUserData(loggedUser.user, {
                        email: email,
                        displayName: firstName + " " + lastName,
                        phoneNumber: "",
                    });
                })
                .catch(error => {
                    setServerError(true);
                    console.log(error);
                });
            
        })
        .catch(error => {
            console.log(error);
            setServerError(true);
        });
    };

    const back = () => {
        setMainRedirect(true);
    }

    const setRepeatPasswordCorrection = (e) => {
        setPasswordRepeat(e.target.value)
        if(e.target.value !==  password)
            setDiffrentPasswordError(true);
        else
            setDiffrentPasswordError(false);
        if(emptyFieldError)
            setEmptyFieldError(false);
        if(serverError)
            setServerError(false);
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        if(emptyFieldError)
            setEmptyFieldError(false);
        if(serverError)
            setServerError(false);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
        if(emptyFieldError)
            setEmptyFieldError(false);
        if(serverError)
            setServerError(false);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if(emptyFieldError)
            setEmptyFieldError(false);
        if(serverError)
            setServerError(false);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        if(e.target.value !==  passwordRepeat)
            setDiffrentPasswordError(true);
        else
            setDiffrentPasswordError(false);
        if(emptyFieldError)
            setEmptyFieldError(false);
        if(serverError)
            setServerError(false);
    }

    if(mainRedirect){
        return <Redirect to="/"/>
    }

    return (
        <>
            <div className="log-reg-con">
                <div className="log-reg-tit">
                    <h2>
                        Rejestracja
                    </h2>
                </div>
                <div className="log-reg-div">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm2">Imię*:</span>
                        </div>
                        <input type="text" name="descSearch" value={firstName} onChange={handleFirstName} id="11" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm2">Nazwisko*:</span>
                        </div>
                        <input type="text" name="descSearch" value={lastName} onChange={handleLastName} id="2" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm2">Email*:</span>
                        </div>
                        <input type="text" name="descSearch" value={email} onChange={handleEmail} id="3" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm2">Hasło <br/>(min. 6 znaków)*:</span>
                        </div>
                        <input type="password" name="tagSearch" value={password} onChange={handlePassword} id="4" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm2">Powtórz hasło*:</span>
                        </div>
                        <input type="password" name="tagSearch" value={passwordRepeat} onChange={setRepeatPasswordCorrection} id="5" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div>
                        {diffrentPasswordError && <h6 style={{color: "red"}}>{diffrentPasswordErrorMessage}</h6> }
                        {emptyFieldError && <h6 style={{color: "red"}}>{emptyFieldErrorMessage}</h6> }
                        {serverError && <h6 style={{color: "red"}}>{serverErrorMessage}</h6> }
                    </div>
                </div>
        
                <div className="buttons-form">
                    <div className="btn-div-frame space-app buttons-page-div m-*-auto text-center" style={{margin: 'auto'}}>
                        <button className="btn border-btn btn-success m-2"style={{margin: 'auto'}} onClick={register} >Zarejestruj się</button>
                        <button className="btn border-btn btn-select  btn-secondary m-2" style={{margin: 'auto'}} onClick={back}>Powrót</button>
                    </div>
                </div>
            </div>
        </>
    );
  
}

export default Register;