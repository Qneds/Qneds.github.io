import {
    BrowserRouter as Router, NavLink
} from "react-router-dom";
import { React, Component, useState, useEffect, useContext } from 'react';

import 'bootstrap';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from "../../firebase";

import User from "../../contexts/User";

import "../../styles/menu.css"

const MainPage = () => {

    const {user, setUser} = useContext(User);
    useEffect(
        () => {
            const unsubscribe = auth.onAuthStateChanged((u) => {
                if(u){
                    setUser(u);
                } else {
                    console.log("User not logged");
                    setUser(null);
                }
            });
            return () => unsubscribe();
        }
    , []);
    
    const logout = () => {
        setUser(null);
        auth.signOut();
    }

    if(user) {
        return(
            <>  
                <div className="menu-outer sticky-top">
                    <div className="menu-div">
                        <div className="btn-div-frame space-app buttons-page-div">
                            <NavLink to="/main-page/settings" exact className="btn btn-primary center-btn menu-buttons active">Ustawienia</NavLink>
                            <NavLink to="/main-page/offers" exact className="btn btn-primary center-btn menu-buttons active">Przeszukuj oferty</NavLink>
                            <NavLink to="/main-page/your-offers" exact className="btn btn-primary center-btn menu-buttons active">Twoje oferty</NavLink>
                            <NavLink to="/main-page/borrowed" exact className="btn btn-primary center-btn menu-buttons active">Aktualnie wypożyczane</NavLink>
                            <NavLink to="/main-page/history" exact className="btn btn-primary center-btn menu-buttons active">Historia</NavLink>
                            <a href="/" className="btn btn-primary center-btn menu-buttons active" onClick={logout}>Wyloguj</a> 
                        </div>
                    </div>
                </div>
            </>
        );

    } else {
        console.log(user);
        return(
            <div className="not-logged">
                <h1>
                    You are not logged in.
                </h1>
            </div>
        );
    }
  
}

export default MainPage;