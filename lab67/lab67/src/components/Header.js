import User from '../contexts/User';
import { React, Component, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import "../styles/headre.css"

const Header = () => {


    return (
        <div className="outer">
            <div className="inner">
                <h2 className="title">
                    Wypożyczalnia pojazdów
                </h2>
            </div>
        </div>
    );
}

export default Header;