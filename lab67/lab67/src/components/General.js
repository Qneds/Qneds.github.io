import User from '../contexts/User';
import { React, Component, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';


import { getUserData, getOffer, updateOffer, addOfferToHistory, timeStamp, setLastDateInOfferBorrows, getBorowedOfferHistory } from '../firebase'


export function GetFormattedDate(date) {
    
    if(date.toDate().toLocaleString())
        return date.toDate().toLocaleString();
    else 
        return "";
    /*
    const add0 = (n) =>{
        if (n < 10) 
            return "0" + n;
        else
            return "" + n;
    }
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();

    return add0(day) + "-" + add0(month) + "-" + add0(year)  + " " + add0(h) + ":" + add0(m);
    */
}

export const NumberOfFoundedOffers = (props) => {
    return (
        <div className="found_el">
            Znaleziono {props.numberOfOffers} ofert
        </div>
    );
}

export const OfferBox = (props) => {

    const {user, setUser} = useContext(User);
    const [editRedirect, setEditRedirect] = useState(false);
    const [downOwner, setDownOwner] = useState(true);
    const [buttonContactText, setButtonContactText] = useState("Kontakt");
    const [shown, setShown] = useState("none");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [available, setAvailable] = useState(null);
    const [addDate, setAddDate] = useState("");

    const [auto, setAuto] = useState("");
    const [desc, setDesc] = useState("");
    const [cost, setCost] = useState("");
    
    const [borrowingPerson,  setBorrowingPerson] = useState(null);
    const [isBorrowing, setIsBorrowing] = useState(false);

    const [showBorrowDate, SetShowBorrowDate] = useState("none");
    const [date, setDate] = useState("");
    const [stopRerenderDate,  setStopRerenderDate] =  useState(false);
    const [stopRerenderState,  setStopRerenderState] =  useState(false);

    const [id, setId] = useState(props.id);


    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            setId(props.id); 
            setStopRerenderDate(false) 
        }
        return () => isMounted = false;
    }, [props.id]);


    const edit = () => {
        setEditRedirect(true)
    }

    const contact = () => {
        if(downOwner === true){
            getUserData(user)
                .then(u =>{
                    setButtonContactText("Schowaj");
                    setShown("block");
                    setDownOwner(false);
                    setEmail(u.data().email);
                    setName(u.data().displayName);
                    setNumber(u.data().phoneNumber);
                });
        } else {
            setDownOwner(true);
            setButtonContactText("Kontakt");
            setShown("none");
        }
    }

    const borrow = () => {
        getOffer(id)
        .then(o =>{
            setAvailable(o.data().state)
            if(o.data().state === "Available"){
                
                updateOffer({
                    id: o.id,
                    data:{
                        state: "Borrowed",
                        borrowedBy: user.uid
                    }
                }).then(r => {
                    
                    addOfferToHistory({
                        offerId: id,
                        userId: user.uid,
                        borrowDate: timeStamp,
                        returnDate: ""
                    }).then(i => {
                        updateOffer({
                            id: o.id,
                            data:{
                                historyDoc: i.id
                            }
                        }).then(() => {
                            setBorrowingPerson(user.uid);
                            setAvailable("Borrowed");
                            setIsBorrowing(true);
                        });
                    });
                }); 
            } else if (o.data().state === "Borrowed"){
                
                if(o.data().borrowedBy === user.uid){
                    setLastDateInOfferBorrows(o.data().historyDoc)
                    .then(() => {
                        updateOffer({
                            id: o.id,
                            data:{
                                state: "Available",
                                borrowedBy: null,
                                historyDoc: null
                            }
                        }).then(() => {
                            setAvailable("Available");
                            setIsBorrowing(false);
                            setBorrowingPerson(null);
                        });
                    });

                }
            } else {

            }
        });
    }

    if(available === null && !stopRerenderState && id !== ""){
        setStopRerenderState(true);
        getOffer(id)
            .then(o =>{
                setBorrowingPerson(o.data().borrowedBy);
                setAvailable(o.data().state); 
                setAddDate(GetFormattedDate(o.data().date));
                setAuto(o.data().auto)
                setDesc(o.data().description)
                setCost(o.data().cost)
                if(o.data().borrowedBy === user.uid){
                    setIsBorrowing(true);
                } else {
                    setIsBorrowing(false);
                }

            });
            
        return(
            <>
            </>
        );
    }
    
    if(editRedirect){
        return <Redirect to={{  pathname: "/main-page/your-offers/edit",
                                state: { 
                                    auto: auto,
                                    desc: desc,
                                    cost: cost,
                                    id: id,
                                    stat: available
                                }
                            }}/>
    }
    let str = "";
    if(available === "Available")
        str = "Dostępny";
    else if(available === "Borrowed")
        str = "Wypożyczony";
    else 
        str = "Niedostępny";

    let disp = "block";
    if(available === "Borrowed")
        disp = "none";

    if(props.toOwner ===  true){
        return (

            <div className="offer-box">
                <MainData auto={auto} cost={cost} addDate={addDate}/>
                <div className="offer-desc">
                    <Descripton desc={desc}/>
                </div>
                <div className="offer-bar-top"></div>
                <div className="offer-bar-bottom"></div>
                <div className="offer-status">
                    <Status status={str}/>
                </div>
                <div className="offer-buttons" style={{display: disp}}>
                    <button className="btn border-btn btn-warning" onClick={edit}>
                        Edytuj
                    </button>
                </div>
            </div>

        );
        
    }
    return (
        <div className="offer-box">
            <MainData auto={auto} cost={cost} addDate={addDate}/>
            <div className="offer-desc">
                <Descripton desc={desc}/>
            </div>
            <div className="offer-bar-top"></div>
            <div className="offer-bar-bottom"></div>
            <div className="offer-holder">
                <div className="offer-contact" style={{display: shown}}>
                    <Contact  name={name} email={email} number={number}/>
                </div>
                    <BorrowDate isBorrowing={isBorrowing} id={id}/>
            </div>
            <div className="offer-buttons">
                <button className="btn border-btn btn btn-info" onClick={contact}>
                    {buttonContactText}
                </button>
                <BorrowButton clickHandler={borrow} available={available} borrowingPerson={borrowingPerson}/>
            </div>
        </div>
    );
}

export const OfferBoxLi = (props) => {
    return(
        <li className="list-group-item">
            <OfferBox toOwner={props.toOwner} addDate={props.addDate} 
            owner={props.owner} auto={props.auto} desc={props.desc} 
            state={props.state} cost={props.cost} key={props.id} id={props.id}/>
        </li>
    );
}

const BorrowButton = (props) =>{

    const {user, setUser} = useContext(User);

    if(props.available === "Available"){
        return(
            <button className="btn border-btn btn-success" onClick={props.clickHandler}>
                Wypożycz
            </button>
        );
    } else if (props.available === "Borrowed"){
        if(props.borrowingPerson === user.uid){
            return(
                <button className="btn border-btn btn-secondary" onClick={props.clickHandler}>
                    Zwróć
                </button>
            );
        } else {
            return(
                <button className="btn border-btn btn-warning" disabled>
                    Auto zostało już wypożczone
                </button>
            );
        } 
        
    } else {
        return(
            <button className="btn border-btn btn-outline-dark" disabled>
                Oferta niedostępna
            </button>
        );
    }
}

const BorrowDate = (props) => {

    const {user, setUser} = useContext(User);

    const [showBorrowDate, SetShowBorrowDate] = useState("none");
    const [borrowDate, setBorrrowDate] = useState("");
    const [stopRerenderDate,  setStopRerenderDate] =  useState(false);
    const [isBorrowing, setIsBorrowing] = useState(props.isBorrowing);

    useEffect(() => { 
        let isMounted = true;
        if(isMounted){
            setIsBorrowing(props.isBorrowing);
            setStopRerenderDate(false) ;
        }    
        return () => isMounted = false;
    }, [props.isBorrowing]);
    

    if(!stopRerenderDate){
        setStopRerenderDate(true);
        if(isBorrowing){
            
            getBorowedOfferHistory(user, props.id)
            .then((qs) =>{
                qs.forEach(o =>{
                    SetShowBorrowDate("block");
                    setBorrrowDate(GetFormattedDate(o.data().borrowDate));
                })
                
            })
            .catch((error) => {
                SetShowBorrowDate("none");
                setBorrrowDate("");
                
            })
        
        } else{
            SetShowBorrowDate("none");
            setBorrrowDate("");
        }
    }
    
    
    return (
        <div className="offer-borrow-date" style={{display: showBorrowDate}}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col center">Data wypożyczenia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{borrowDate}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const MainData = (props) => {
    return(
        <div className="offer-main">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Pojazd</th>
                        <th scope="col">Data dodania</th>
                        <th scope="col">Cena</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.auto}</td>
                        <td>{props.addDate}</td>
                        <td>{props.cost}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const Descripton = (props) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col center">Opis</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.desc}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const Contact = (props) => {
    return (
        <div>
            <table className="table border-dark">
                <thead>
                    <tr>
                        <th colspan="2">Kontakt</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Imie i nazwisko</td>
                        <td>{props.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{props.email}</td>
                    </tr>
                    <tr>
                        <td>Numer telefonu</td>
                        <td>{props.number}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const Status = (props) => {

    let str = ""
    if(props.status === "Dostępny")
        str = "bg-success"
    else if(props.status === "Wypożyczony")
        str = "bg-primary"
    else 
        str = "bg-secondary"

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={str + " text-white"}>{props.status}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


