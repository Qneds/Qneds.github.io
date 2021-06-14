import { React, Component, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateOffer, timeStamp, getOffer } from '../../../firebase'

import { OfferBox, NumberOfFoundedOffers } from '../../General';

import User from '../../../contexts/User';


const DisableButton = (props) => {
    const {user, setUser} = useContext(User);
    const [state, setState] = useState(props.initState);
    const [id, setId] = useState(props.id);

    const [serverError, setServerError] =  useState(false);
    const [serverErrorMessage, setServerErrorrMessage] =  useState("Nie udało się zmienić stanu ogłoszenia");

    const [loaded, setLoaded] = useState(false);

    if(!loaded){
        setLoaded(true);
        getOffer(id)
        .then((o) =>{
            setState(o.data().state)
        })
        .catch(error => {
            setServerError(true);
            console.log(error);
        });
    }

    const enable = () => {

        if(serverError)
            setServerError(false);

        getOffer(id)
        .then((o) =>{
            if(o.data().state === "Unavailable"){
                updateOffer({
                    id: id,
                    data: {
                        state: "Available",
                        date: timeStamp
                    }
                })
                .then(() =>{
                    setState("Available");
                })
                .catch(error => {
                    setServerError(true);
                    console.log(error);
                    setState(o.data().state)
                });
            } else {
                setState(o.data().state)
            }

        })
        .catch(error => {
            setServerError(true);
            console.log(error);
        });
    }

    const disable = () => {
        if(serverError)
            setServerError(false);

        getOffer(id)
        .then((o) =>{
            if(o.data().state === "Available"){
                updateOffer({
                    id: id,
                    data: {
                        state: "Unavailable"
                    }
                })
                .then(() =>{
                    setState("Unavailable");
                })
                .catch(error => {
                    setServerError(true);
                    console.log(error);
                    setState(o.data().state)
                });
            } else {
                setState(o.data().state)
            }
        })
        .catch(error => {
            setServerError(true);
            console.log(error);
        })
    }
    if(state === "Available"){

        return(
            <>
                <button className="btn border-btn btn-danger m-2" onClick={disable}>Dezaktywuj</button>
                {serverError && <h6 style={{color: "red"}}>{serverErrorMessage}</h6> }
            </>
        );

    } else if(state === "Borrowed"){
        return(
            <>
                <button className="btn border-btn btn-danger m-2" disable>Nie można modyfikować tej oferty</button>
            </>
        );
    } else {
        return(
            <>
                <button className="btn border-btn btn-warning m-2" onClick={enable}>Aktywuj ponownie</button>
                {serverError && <h6 style={{color: "red"}}>{serverErrorMessage}</h6> }
            </>
        );
    }

    
}

const EditOffer = (p) => {

    const {user, setUser} = useContext(User);

    let props = p.location.state;

    const [auto, setAuto] = useState(props.auto);
    const [desc, setDesc] = useState(props.desc);
    const [cost, setCost] = useState(props.cost);
    const [offersRedirect, setOffersRedirect] = useState(false);

    const [emptyFieldError, setEmptyFieldError] =  useState(false);
    const [emptyFieldErrorMessage, setEmptyFieldErrorMessage] =  useState("Pola z (*) są obowiązkowe");

    const [serverError, setServerError] =  useState(false);
    const [serverErrorMessage, setServerErrorrMessage] =  useState("Nie udało się zaktualizować ogłoszenia");


    if(!user) {
        return (
            <>
            </>
        );
    }

    const save = () => {

        if(auto.trim() === "" || cost.trim() === ""){
            setEmptyFieldError(true);
            return;
        }

        updateOffer({
            id: props.id,
            data: {
                auto: auto,
                description: desc,
                cost: cost
            }
        })
        .then(() => {
            setOffersRedirect(true);
        })
        .catch(error => {
            console.log(error);
            setServerError(true);
        });
    } 

    const back = () => {
        setOffersRedirect(true);
    }

    if(offersRedirect){
        return <Redirect to="/main-page/your-offers"/>
    }

    const handleAuto = (e) => {
        setAuto(e.target.value);
        if(emptyFieldError)
            setEmptyFieldError(false);
        if(serverError)
            setServerError(false);
    }

    const handleDesc = (e) => {
        setDesc(e.target.value);
        if(emptyFieldError)
            setEmptyFieldError(false);
        if(serverError)
            setServerError(false);
    }

    const handleCost = (e) => {
        setCost(e.target.value);
        if(emptyFieldError)
            setEmptyFieldError(false);
        if(serverError)
            setServerError(false);
    }

    let disp = "block";
    if(props.state === "Borrowed")
        disp = "none";

    return (
        <>  
            <div className="add-edit-con">
                <div className="log-reg-tit">
                    <h2>
                        Edycja oferty
                    </h2>
                </div>
                <div className="add-edit-box">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="0">Auto:</span>
                        </div>
                        <input type="text" name="descSearch" value={auto} onChange={handleAuto} id="1" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="1">Opis:</span>
                        </div>
                        <textarea className="form-control" aria-label="With textarea" rows="3" value={desc} onChange={handleDesc}></textarea>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="2">Cena*:</span>
                        </div>
                        <input type="text" name="descSearch" value={cost} onChange={handleCost} id="3" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div>
                        {emptyFieldError && <h6 style={{color: "red"}}>{emptyFieldErrorMessage}</h6> }
                        {serverError && <h6 style={{color: "red"}}>{serverErrorMessage}</h6> }
                    </div>
                </div>
                <div className="buttons-form">
                    <div className="btn-div-frame space-app buttons-page-div m-*-auto text-center">
                        <button className="btn border-btn btn-success m-2" onClick={save} style={{display: disp}}>Zapisz</button>
                        <button className="btn border-btn btn-secondary m-2" onClick={back}>Powrót</button>
                        <DisableButton initState={props.state} id={props.id}/>
                    </div>
                </div>
            </div>
        </>
    );  
}



export default EditOffer;