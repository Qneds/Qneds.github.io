"use strict";

import { React, Component } from 'react';
import {Student, AddStudentBox} from './Support';

import '../../styles/styleStudents.css';

import Data from '../../data/data';

import emailjs from 'emailjs-com';

class EditUser extends Component {

    state = {
        newNameValue: "",
        newDescValue: "",
        newEmailValue: "",
        newTagsValue: "",
        showWarning: false,
        prevEmail: "",
        id: -1
    }
    errorMessage = "Student z danym e-mailem i imieniem już istnieje lub email jest niepoprawny.";

    constructor(props) {
        super(props);
        
        let params = window.location.search.substring(1);
        params = params.split("&");

        console.log(params);
        let paramV = params.map(it => ({param: it.split("=")[0], value: it.split("=")[1]}));

        this.state = {
            newNameValue: "",
            newDescValue: "",
            newEmailValue: "",
            newTagsValue: "",
            prevEmail: "",
            showWarning: false,
            id: -1
        }

        let students = this.props.students();
        let id = -1;
        debugger
        for(let i of paramV){
            if (i.param === "id"){
                if(i.value < students.length){
                    id = i.value;
                } 
            }
        }

        if(id !== -1){
            this.state = {
                newNameValue: students[id].name,
                newDescValue: students[id].desc,
                newEmailValue: students[id].email,
                newTagsValue: students[id].tags,
                prevEmail: students[id].email,
                showWarning: false,
                id: id
            };
        }
        
    }

    handleNameEntry = (event) => {
        this.setState({
            newNameValue: event.target.value
        });
    }

    handleDescEntry = (event) => {
        this.setState({
            newDescValue: event.target.value
        });
    }

    handleEmailEntry = (event) => {
        this.setState({
            newEmailValue: event.target.value
        });
    }

    handleTaggsEntry = (event) => {
        this.setState({
            newTagsValue: event.target.value
        });
    }

    
    saveStudent = (event) => {

        let student = new Student(this.state.newNameValue, this.state.newDescValue, this.state.newEmailValue,  this.state.newTagsValue);

        if(this.state.newNameValue === "" || this.state.newDescValue === "" || this.state.newEmailValue === "" ||  this.state.newTagsValue === "")
            return;

        let students = this.props.students();

        let found = false;
        for(var i = 0; i < students.length; i++) {
            if (students[i].email === student.email && students[i].name === student.name) {
                found = true;
                break;
            }
        }

        if(this.state.prevEmail === this.state.newEmailValue) {
            found = false;
        }

        if(found){
            this.setState({
                showWarning: true
            });
        } else {

            let dots = "";
            if(window.location.port !== ""){
                dots = ":"
            }
            let path = window.location.protocol + "//" + window.location.hostname + dots + window.location.port + "/editStudent?id=" + this.state.id;

            emailjs.send(
                Data.SERVICE_ID, Data.TEMPLATE_ID_STUDENT,
                {   
                    name: this.state.newNameValue, 
                    receiver: this.state.newEmailValue,
                    message: path
                }, Data.USER_ID

            ).then(res => {
                this.setState({
                    showWarning: false
                });
                this.props.save(this.state.id, student);
            }).catch(err => {
                this.setState({
                    showWarning: true
                });
            });

        }
    }



    // it => ( )
    render() {

        if(this.state.id !== -1){
            return (
                //React.Fragment
                <>
                    <div className="frame">
                        <h2>Edytowanie studenta</h2>
                        <AddStudentBox
                        newNameValue={this.state.newNameValue}
                        handleOnNameChange={this.handleNameEntry}
    
    
                        newDescValue={this.state.newDescValue}
                        handleOnDescChange={this.handleDescEntry}
    
    
                        newEmailValue={this.state.newEmailValue}
                        handleOnEmailChange={this.handleEmailEntry}
      
                        newTagsValue={this.state.newTagsValue}
                        handleOnTagsChange={this.handleTaggsEntry}
                        />
                        {this.state.showWarning && <h3 style={{color: "red"}}>{this.errorMessage}</h3> }
    
                        <button className="btn btn-primary" onClick={this.saveStudent}>Zapisz studenta</button>
                    </div>
    
                </>
            );
        } else {
            return (
                <>
                <h2>Nie znaleziono studenta.</h2>
                </>
            );
        }
    }
}

export default EditUser;