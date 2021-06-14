import { React, Component, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateUserData, getUserData, auth } from '../../../firebase'

import User from '../../../contexts/User';

const Settings = () => {

    const {user, setUser} = useContext(User);

    const [firstName, setFirstName] = useState(user.displayName.split(" ")[0]);
    const [lastName, setLastName] = useState(user.displayName.split(" ")[1]);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [passDisp, setPassDisp] = useState(["none", "Zmień hasło"])
    const [loaded, setLoaded] = useState(false);

    const [diffrentPasswordError, setDiffrentPasswordError] =  useState(false);
    const [diffrentPasswordErrorMessage, setDiffrentPasswordErrorMessage] =  useState("Podane hasła są różne");

    const [actualPasswordDifferent, setActualPasswordDifferent] =  useState(false);
    const [actualPasswordDifferentMessage, setActualPasswordDifferentMessage] =  useState("Podanoe nieprawidłowe aktualne hasło");


    const [emptyFieldError, setEmptyFieldError] =  useState(false);
    const [emptyFieldErrorMessage, setEmptyFieldErrorMessage] =  useState("Pola z (*) są obowiązkowe");

    const [emptyFieldPassError, setEmptyFieldPassError] =  useState(false);
    const [emptyFieldPassErrorMessage, setEmptyFieldPassErrorMessage] =  useState("Należy podać hasła");

    const [serverError, setServerError] =  useState(false);
    const [serverErrorMessage, setServerErrorrMessage] =  useState("Nie zaktualizować danych");

    const [isOk, setIsOk] = useState(false);
    const [isOkMessage, setIsOkMessage] = useState("Dane zostały zaktualizowane");

    const [isOkPass, setIsOkPass] = useState(false);
    const [isOkPassMessage, setIsOkPassMessage] = useState("Hasło zostało zaktualizowane");
    
    const [serverErrorPass, setServerErrorPass] = useState(false);
    const [serverErrorPassMessage, setServerErrorPassMessage] = useState("Nie udało się zaktualizować hasła");


    const update = () => {

        if(firstName.trim() === "" || lastName.trim() === "" || email.trim() === ""){
            setEmptyFieldError(true);
            return;
        }

        user.updateProfile({
            displayName: firstName + " " + lastName
        })
        .then(() =>{
            user.updateEmail(email)
            .then(() =>{
                updateUserData(user, {
                    email: email,
                    displayName: firstName + " " + lastName,
                    phoneNumber: phoneNumber,
                })
                .then(() => {
                    setIsOk(true);
                })
                .catch(error => {
                    setServerError(true);
                    console.log(error);
                })
            })
            .catch(error => {
                setServerError(true);
                console.log(error);
            });
        })
        .catch(error => {
            setServerError(true);
            console.log(error);
        });
        
        
    }

    const dispChngPass = () => {
        if(passDisp[0] === "none")
            setPassDisp(["block", "Showaj"]);
        else
            setPassDisp(["none", "Zmień hasło"]);
    }

    const savePass = () => {

        if(oldPassword.trim() === "" || newPassword.trim() === "" || repeatPassword.trim() === ""){
            setEmptyFieldPassError(true);
            return;
        }

        if(emptyFieldPassError)
            return;
        else {
            if(repeatPassword !==  newPassword){
                setDiffrentPasswordError(true);
                return;
            }
        }

        auth.signInWithEmailAndPassword(email, oldPassword)
        .then(loggedUser => {
            user.updatePassword(newPassword)
            .then(() => {
                setIsOkPass(true);
              })
              .catch (error => {
                setServerErrorPass(true);
              });
        })
        .catch(error =>{
            setActualPasswordDifferent(true);
        });
        
    }

    if(!user) {
        return (
            <>
            </>
        );
    }

    if(!loaded){
        setLoaded(true);
        getUserData(user)
        .then(o => {
            setPhoneNumber(o.data().phoneNumber);
        })
    }

    const setRepeatPasswordCorrection = (e) => {
        setRepeatPassword(e.target.value)
        if(e.target.value !==  newPassword)
            setDiffrentPasswordError(true);
        else
            setDiffrentPasswordError(false);
        if(actualPasswordDifferent)
            setActualPasswordDifferent(false);
        if(serverErrorPass)
            setServerErrorPass(false);
        if(isOkPass)
            setIsOkPass(false);
        if(emptyFieldPassError)
            setEmptyFieldPassError(false);
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        if(emptyFieldError)
            setEmptyFieldError(false);
        if(serverError)
            setServerError(false);
        if(isOk)
            setIsOk(false);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
        if(emptyFieldError)
            setEmptyFieldError(false);
        if(serverError)
            setServerError(false);
        if(isOk)
            setIsOk(false);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        if(emptyFieldError)
            setEmptyFieldError(false);
        if(serverError)
            setServerError(false);
        if(isOk)
            setIsOk(false);
    }

    const handlePassword = (e) => {
        setNewPassword(e.target.value)
        if(e.target.value !==  repeatPassword)
            setDiffrentPasswordError(true);
        else
            setDiffrentPasswordError(false);
        if(actualPasswordDifferent)
            setActualPasswordDifferent(false);
        if(serverErrorPass)
            setServerErrorPass(false);
        if(isOkPass)
            setIsOkPass(false);
        if(emptyFieldPassError)
            setEmptyFieldPassError(false);
    }

    const handleOldPassword = (e) => {
        setOldPassword(e.target.value)
        if(actualPasswordDifferent)
            setActualPasswordDifferent(false);
        if(serverErrorPass)
            setServerErrorPass(false);
        if(isOkPass)
            setIsOkPass(false);
        if(emptyFieldPassError)
            setEmptyFieldPassError(false);
    }

    return (
        <>
            <div className="settings-con">
                <div className="log-reg-tit">
                    <h2>
                        Ustawienia
                    </h2>
                </div>
                <div className="log-reg-div">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="3">Imię*:</span>
                        </div>
                        <input type="text" name="descSearch" value={firstName} onChange={handleFirstName} id="20" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="4">Nazwisko*:</span>
                        </div>
                        <input type="text" name="descSearch" value={lastName} onChange={handleLastName} id="21" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="5">Email*:</span>
                        </div>
                        <input type="text" name="descSearch" value={email} onChange={handleEmail} id="23" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="6">Numer telefonu:</span>
                        </div>
                        <input type="text" name="descSearch" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} id="24" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div>
                        {emptyFieldError && <h6 style={{color: "red"}}>{emptyFieldErrorMessage}</h6> }
                        {serverError && <h6 style={{color: "red"}}>{serverErrorMessage}</h6> }
                        {isOk && <h6 style={{color: "green"}}>{isOkMessage}</h6> }
                    </div>
                </div>
                <div className="buttons-form">
                    <div className="btn-div-frame space-app buttons-page-div m-*-auto text-center">
                        <button className="btn btn border-btn btn-success m-2" onClick={update}>Zapisz</button>
                        <button className="btn btn border-btn btn-dark m-2" onClick={dispChngPass}>{passDisp[1]}</button>
                    </div>
                </div>
                <div className="password-change-box" style={{display: passDisp[0]}}>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="7">Stare hasło:</span>
                        </div>
                        <input type="password" name="descSearch" value={oldPassword} onChange={handleOldPassword} id="25" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="8">Nowe hasło<br/>(min. 6 znaków):</span>
                        </div>
                        <input type="password" name="descSearch" value={newPassword} onChange={handlePassword} id="26" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="9">Powtórz hasło:</span>
                        </div>
                        <input type="password" name="descSearch" value={repeatPassword} onChange={setRepeatPasswordCorrection} id="27" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div>
                        {emptyFieldPassError && <h6 style={{color: "red"}}>{emptyFieldPassErrorMessage}</h6> }
                        {diffrentPasswordError && <h6 style={{color: "red"}}>{diffrentPasswordErrorMessage}</h6> }
                        {serverErrorPass && <h6 style={{color: "red"}}>{serverErrorPassMessage}</h6> }
                        {actualPasswordDifferent && <h6 style={{color: "red"}}>{actualPasswordDifferentMessage}</h6> }
                        {isOkPass && <h6 style={{color: "green"}}>{isOkPassMessage}</h6> }
                    </div>
                    <div className="btn-div-frame space-app buttons-page-div">
                        <button className="btn btn border-btn btn-success m-2" onClick={savePass}>Zapisz hasło</button>
                    </div>
                </div>
            </div>
        </>
    );  
}
export default Settings;