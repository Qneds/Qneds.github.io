"use strict";
import {React} from 'react';
import {TagBox} from '../students/Support';

import '../../styles/styleGroups.css';

export function hashCode(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


export const AddGroupBox = (props) => {
    return (
        <div className= "space">

            <div className="container cont">
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm2">Nazwa:</span>
                    </div>
                    <input
                    type="text"
                    name="newName"
                    className="form-control" 
                    aria-label="Small"
                    value={props.newNameValue}
                    onChange={props.handleOnNameChange}
                    />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm2">Opis:</span>
                    </div>
                    <input
                    type="text"
                    name="newDesc"
                    className="form-control" 
                    aria-label="Small"
                    value={props.newDescValue}
                    onChange={props.handleOnDescChange}
                    />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm2">Email:</span>
                    </div>
                    <input
                    type="text"
                    name="newEmail"
                    className="form-control" 
                    aria-label="Small"
                    value={props.newEmailValue}
                    onChange={props.handleOnEmailChange}
                    />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm2">Tagi:</span>
                    </div>
                    <input
                    type="text"
                    name="newName"
                    className="form-control"
                    aria-label="Small"
                    value={props.newTagsValue}
                    onChange={props.handleOnTagsChange}
                    />
                </div>
            </div>
        </div>
        
    );
}

export const NumberOfMembers = (props) => {
    return (
        <div className="found_el">
            Znaleziono {props.amountOfMembers} członków
        </div>
    );
}

export const NumberOfGroups = (props) => {
    return (
        <div className="found_el">
            Znaleziono {props.amountOfGroups} grup
        </div>
    );
}

export const MemberBox = (props) => {
    return (
        <li className="list-group-item">
            <div className="name">
                {props.name}
            </div>
            <div className="email">
                Kontakt: {props.email}
            </div>
            <button className="btn btn-danger" onClick={() => props.removeMember(props.name, props.email)}>Usuń członka</button>
        </li>
    );
}

const SmallMemberBox = (props) => {
    return (
        <li className="list-group-item">
            <div>
                <div className="small-member-name">
                    {props.name}
                </div>
                <div className="small-member-email">
                    Kontakt: {props.email}
                </div>
            </div>
        </li>
    );
}

export const GroupBox = (props) => {
    let tags = props.tags.split(/[\s,]+/);

    const tagList = tags.map(it => (
        <TagBox tag={it} key={hashCode(it)} />
    ));

    const memberList = props.members.map(it => (
        <SmallMemberBox name={it.name} email={it.email} key={hashCode(it.email + it.name)}/>
    ));

    return (
        <li className="list-group-item">
            <div className="name">
                {props.name}
            </div>
            <div className="desc">
                {props.desc}
            </div>
            <div className="email">
                Kontakt: {props.email}
            </div>
            <div className="tags">
                <div style={{"width" : "100%"}}>
                    Poszukujemy ludzi znających:
                </div>
                <div>
                    {tagList}
                </div>
            </div>
            <div className="tags">
                <div style={{"width" : "100%"}}>
                    Nasz skład:
                </div>
                <div>
                    <ul className="list-group">
                        {memberList}
                    </ul>
                </div>
            </div>
        </li>
    );
}