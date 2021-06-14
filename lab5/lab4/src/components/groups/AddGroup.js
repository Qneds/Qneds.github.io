"use strict";
import { React, Component } from 'react';

import {AddGroupBox} from './Support';

import AddMember from './AddMember';
import MemberSearch from './MemberSearch';

import Data from '../../data/data';
import emailjs from 'emailjs-com';

class AddGroup extends Component {

    state = {
        newNameValue: "",
        newDescValue: "",
        newEmailValue: "",
        newTagsValue: "",
        showWarning: false,
        members: []
    }
    errorMessage = "Grupa z danym e-mailem i nazwą już istnieje lub email jest nieprawidłowy."

    constructor(props) {
        super(props);
        this.addGroupToList = props.addGroup;
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

    AddMember = (name, email) => {
        this.setState({
            members: this.state.members.concat({name: name, email: email})
        });
        
    }

    AddNewGroup = (event) => {

        let group = {
            name: this.state.newNameValue,
            desc: this.state.newDescValue,
            email: this.state.newEmailValue,
            tags: this.state.newTagsValue,
            members: this.state.members
        }

        if(this.state.newNameValue === "" || this.state.newDescValue === "" || this.state.newEmailValue === "" ||  this.state.newTagsValue === "")
            return;

        let groups = this.props.getGroupList();

        let found = false;
        for(var i = 0; i < groups.length; i++) {
            if (groups[i].email === group.email && groups[i].name === group.name) {
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
            if(window.location.port !== ""){
                dots = ":"
            }
            let path = window.location.protocol + "//" + window.location.hostname + dots + window.location.port + "/editGroup?id=" + groups.length

            emailjs.send(
                Data.SERVICE_ID, Data.TEMPLATE_ID_GROUP,
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
                    members: [],
                    showWarning: false
                });
                this.props.addGroup(group)
            }).catch(err => {
                this.setState({
                    showWarning: true
                });
            });
        }
    }

    removeMemberFromList = (name, email) => {
        let obj = {name: name, email: email};
        let array = this.state.members;

        const index = array.findIndex(o => o.name === obj.name && o.email === obj.email );
        if (index > -1) {
            array.splice(index, 1);
        }

        this.setState({
            members: array
        });

    }

    // it => ( )
    render() {
        return (
            //React.Fragment
            <>
                <div className="frame">
                    <h2>Dodawanie nowej grupy</h2>
                    <AddGroupBox
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

                    <button className="btn btn-primary" onClick={this.AddNewGroup}>Dodaj grupę</button>

                    <AddMember addMember={this.AddMember} members={this.state.members}/>
                    <MemberSearch members={this.state.members} removeMember={this.removeMemberFromList}/>

                </div>

            </>
        );
    }
}

export default AddGroup;