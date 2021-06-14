import User from '../../../contexts/User';
import { React, Component, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';


import { getUserData, getOffer, getHistoryDoc} from "../../../firebase"


import { GetFormattedDate, OfferBox } from '../../General';



export const HistoryBox = (props) => {

    const {user, setUser} = useContext(User);
    const [id, setId] = useState("");
    const [downOwner, setDownOwner] = useState(true);
    const [buttonContactText, setButtonContactText] = useState("Kontakt");
    const [shown, setShown] = useState("none");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [available, setAvailable] = useState(null);
    const [addDate, setAddDate] = useState("");
    
    const [borrowingPerson,  setBorrowingPerson] = useState(null);
    const [isBorrowing, setIsBorrowing] = useState(false);

    const [borrowDate, setBorrowDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [stopRerenderState,  setStopRerenderState] =  useState(false);





    if(!stopRerenderState){
        setStopRerenderState(true);
        getHistoryDoc(props.id)
        .then(o => {
            setBorrowDate(GetFormattedDate(o.data().borrowDate));
            setId(o.data().offerId);
            if(o.data().returnDate === ""){
                setReturnDate("teraz");
            } else {
                setReturnDate(GetFormattedDate(o.data().returnDate));;
            }
            
        })
        .catch(error =>{

        })
            
        return(
            <>
            </>
        );
    }
        
    return (
        <li className="list-group-item">
            <div className="history-box">
                <div className="history-dates">
                    <div className="history-date-from">
                        Od: {borrowDate}
                    </div>
                    <div className="history-date-to">
                    Do: {returnDate}
                    </div>
                </div>
                <div className="history-offer">
                    <OfferBox toOwner={false} key={id} id={id}/>
                </div>
            </div>
        </li>
    );
}

export default HistoryBox;