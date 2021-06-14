import { React, Component, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';


import { OfferBox, NumberOfFoundedOffers, GetFormattedDate } from '../../General';

import { getUserData, getOffer, getBorowedHistory} from "../../../firebase"


import User from '../../../contexts/User';
import { HistoryBox } from './HistoryBox';




const History = () => {

    const {user, setUser} = useContext(User);

    const [query, setQuery] = useState("");
    const [addRedirect, setAddRedirect] = useState(false);
    const [out, setOut] = useState(null);
    const [sent, setSent] = useState(false);

    //const [myList,  setMyList] = useState(null);

    const get = () =>{
        getBorowedHistory(user)
        .then(q =>{
            let out = [];
            q.forEach(o => {
                out.push(o.id);
            });
            setOut(out);
        })
        .catch(error =>{
            setOut([]);
        })
    }

    if(!user) {
        return (
            <>
            </>
        );
    }


    if(out === null){
        if(!sent){
            setSent(true);
            get()
            return(
            <>
            </>
            );
        }
    }



    let myList = [];
    let length = 0;
    if(out !== null){
        myList = out.map(it => (
            <HistoryBox key={it} id={it} />
        ));
        length = myList.length;
    }
    return (
        <>
            <div className="offer-con">
                <div className="log-reg-tit">
                    <h2>
                        Historia
                    </h2>
                </div>
                <div className="searching-bar">
                    <div>
                        <NumberOfFoundedOffers numberOfOffers={length}/>
                    </div>
                </div>
                <div className="results-box">
                    <ul className="list-group">
                        {myList}
                    </ul>
                </div>
            </div>
            
        </>
    );  
}
export default History;