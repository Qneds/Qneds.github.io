"use strict";

import { React, Component } from 'react';
import {Student, AddStudentBox} from './Support';

import Data from '../../data/data';

import '../../styles/styleStudents.css';

import emailjs from 'emailjs-com';

class AddUser extends Component {

    state = {
        newNameValue: "",
        newDescValue: "",
        newEmailValue: "",
        newTagsValue: "",
        showWarning: false
    }
    errorMessage = "Student z danym e-mailem już istnieje lub email jest nipoprawny.";

    constructor(props) {
        super(props);
        this.addStudentToList = props.addStudent;
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

    addStudent = (event) => {

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

        if(found){
            this.setState({
                showWarning: true
            });
        } else {
            let dots = "";
            if(window.location.port !== undefined){
                dots = ":"
            }

            let path = window.location.protocol + "//" + window.location.hostname + dots + window.location.port + "/editStudent?id=" + students.length

            emailjs.send(
                Data.SERVICE_ID, Data.TEMPLATE_ID_STUDENT,
                {   
                    name: this.state.newNameValue, 
                    receiver: this.state.newEmailValue,
                    message: path
                }, Data.USER_ID

            ).then(res => {
                this.setState({
                    newNameValue: "",
                    newDescValue: "",
                    newEmailValue: "",
                    newTagsValue: "",
                    showWarning: false
                });
                this.addStudentToList(student)
            }).catch(err => {
                this.setState({
                    showWarning: true
                });
            });
        }
    }



    // it => ( )
    render() {
        return (
            //React.Fragment
            <>
                <div className="frame">
                    <h2>Dodawanie nowego studenta</h2>
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

                    <button className="btn btn-primary" onClick={this.addStudent}>Dodaj studenta</button>
                </div>

            </>
        );
    }
}

export default AddUser;