"use strict";

import {React} from 'react';

import '../../styles/styleStudents.css';

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

export class Student {
    constructor(name, desc, email, tags) {
      this.name = name;
      this.desc = desc;
      this.email = email;
      this.tags = tags;
    }
}

export const TagBox = (props) => {
    return (
        <div className="tag">
            {props.tag}
        </div>
    );
}


export const StudentBox = (props) => {

    let tags = props.tags.split(/[\s,]+/);

    const tagList = tags.map(it => (
        <TagBox tag={it} key={hashCode(it)} />
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
                    Tagi:
                </div>
                <div>
                    {tagList}
                </div>
            </div>
        </li>
    );
}

export const NumberOfFoundedStudnets = (props) => {
    return (
        <div className="found_el">
            Znaleziono {props.numberOfStudent} studentów
        </div>
    );
}

export const AddStudentBox = (props) => {
    return (
        <div className= "space">

            <div className="container cont">
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm2">Imie:</span>
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
