import { React, Component, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addOffer, timeStamp } from '../../../firebase'

import { OfferBox, NumberOfFoundedOffers } from '../../General';

import User from '../../../contexts/User';




const AddOffer = () => {

    const {user, setUser} = useContext(User);

    const [auto, setAuto] = useState("");
    const [desc, setDesc] = useState("");
    const [cost, setCost] = useState("");
    const [offersRedirect, setOffersRedirect] = useState(false);

    const [emptyFieldError, setEmptyFieldError] =  useState(false);
    const [emptyFieldErrorMessage, setEmptyFieldErrorMessage] =  useState("Pola z (*) są obowiązkowe");

    const [serverError, setServerError] =  useState(false);
    const [serverErrorMessage, setServerErrorrMessage] =  useState("Nie udało się dodać ogłoszenia");



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

        addOffer({
            auto: auto,
            description: desc,
            cost: cost,
            owner: user.uid,
            state: "Available",
            borrowedBy: null,
            date: timeStamp
        })
        .then(() => {
            setOffersRedirect(true);
        })
        .catch(error => {
            setServerError(true);
        });
    } 

    const back = () => {
        setOffersRedirect(true);
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

    if(offersRedirect){
        return <Redirect to="/main-page/your-offers"/>
    }

    return (
        <>
            <div className="add-edit-con">
                <div className="log-reg-tit">
                    <h2>
                        Dodawanie oferty
                    </h2>
                </div>
                <div className="add-edit-box">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="0">Pojazd*:</span>
                        </div>
                        <input type="text" name="descSearch" value={auto} onChange={handleAuto} id="4" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
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
                        <input type="text" name="descSearch" value={cost} onChange={handleCost} id="5" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                    </div>
                    <div>
                        {emptyFieldError && <h6 style={{color: "red"}}>{emptyFieldErrorMessage}</h6> }
                        {serverError && <h6 style={{color: "red"}}>{serverErrorMessage}</h6> }
                    </div>
                </div>
                <div className="buttons-form">
                    <div className="btn-div-frame space-app buttons-page-div m-*-auto text-center">
                        <button className="btn border-btn btn-success m-2" onClick={save}>Dodaj</button>
                        <button className="btn border-btn btn-secondary m-2" onClick={back}>Powrót</button>
                    </div>
                </div>
            </div>
        </>
    );  
}
export default AddOffer;