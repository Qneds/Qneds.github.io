import { React, Component, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap';
import '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getBorowed, getBorrowedQ} from '../../../firebase'

import { OfferBoxLi, NumberOfFoundedOffers } from '../../General';

import User from '../../../contexts/User';




const Borrowed = () => {

    const {user, setUser} = useContext(User);

    const [query, setQuery] = useState("");
    const [addRedirect, setAddRedirect] = useState(false);
    const [out, setOut] = useState(null);
    const [sent, setSent] = useState(false);

    //const [myList,  setMyList] = useState(null);


    const find = (q) => {
        
        if(q === null || q === ""){
            getBorowed(user)
                .then((querySnapshot) => {
                    let o = [];
                    querySnapshot.forEach((doc) => {
                        o.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    });
                    setOut(o);
                })
        } else {
            setOut([]);
            let o = [];
            let str = q.split(" ");
            str.forEach(s => {
                getBorrowedQ(user, s)
                    .then((querySnapshot) => {
                        
                        querySnapshot.forEach((doc) => {
                            if (!o.some(e => e.id === doc.id)) {
                                o.push({
                                    id: doc.id,
                                    data: doc.data()
                                });
                            }
                            
                        });
                        
                        setOut(o);
                    })
            })
            
        }
    }

    if(!user) {
        return (
            <>
            </>
        );
    }

    const add = () => {
        setAddRedirect(true);
    }

    if(addRedirect){
        return <Redirect to="/main-page/your-offers/add"/>
    }
    
    if(out === null){
        if(!sent){
            setSent(true);
            find("")
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
            <OfferBoxLi toOwner={false} addDate={it.data.date} owner={it.data.owner} auto={it.data.auto} desc={it.data.description} state={it.data.state} cost={it.data.cost} key={it.id} id={it.id} />
        ));
        length = myList.length;
    }
    
    return (
        <>
            <div className="offer-con">
                <div className="log-reg-tit">
                    <h2>
                        Wypożyczone pojazdy
                    </h2>
                </div>
                <div className="searching-bar">
                    <div className="container cont">
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm2">Wyszukuj:</span>
                            </div>
                            <input type="text" name="descSearch" id="searchDesc" className="form-control" aria-label="Small" 
                                onInput={e => find(e.target.value)} aria-describedby="inputGroup-sizing-sm"/>
                        </div>
                    </div>
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
export default Borrowed;