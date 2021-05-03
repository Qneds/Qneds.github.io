import { React, Component } from 'react';

import {AddGroupBox, NumberOfMembers} from './Support';

import AddMember from './AddMember';
import MemberSearch from './MemberSearch';

import Data from '../../data/data';
import emailjs from 'emailjs-com';

class EditGroup extends Component {

    state = {
        newNameValue: "",
        newDescValue: "",
        newEmailValue: "",
        newTagsValue: "",
        showWarning: false,
        prevEmail: "",
        members: [],
        id: -1
    }
    errorMessage = "Grupa z danym e-mailem i nazwą już istnieje lub email jest niepoprawny."

    constructor(props) {
        super(props);
        this.addGroupToList = props.addGroup;

        let params = window.location.search.substring(1);
        params = params.split("&");

        let paramV = params.map(it => ({param: it.split("=")[0], value: it.split("=")[1]}));

        this.state = {
            newNameValue: "",
            newDescValue: "",
            newEmailValue: "",
            newTagsValue: "",
            showWarning: false,
            prevEmail: "",
            members: [],
            id: -1
        }

        let groups = this.props.getGroupList();
        let id = -1;
        for(let i of paramV){
            if (i.param === "id"){
                if(i.value < groups.length){
                    id = i.value;
                } 
            }
        }

        if(id !== -1){
            this.state = {
                newNameValue: groups[id].name,
                newDescValue: groups[id].desc,
                newEmailValue: groups[id].email,
                newTagsValue: groups[id].tags,
                prevEmail: groups[id].email,
                members: groups[id].members,
                showWarning: false,
                id: id
            }
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

    AddMember = (name, email) => {
        this.setState({
            members: this.state.members.concat({name: name, email: email})
        });
        
    }

    SaveGroup = (event) => {

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

        if(this.state.prevEmail === this.state.newEmailValue) {
            found = false;
        }

        if(found){
            this.setState({
                showWarning: true
            });
        } else {
    
            let path = window.location.hostname + ":" + window.location.port + "/editGroup?id=" + this.state.id;

            emailjs.send(
                Data.SERVICE_ID, Data.TEMPLATE_ID_GROUP,
                {   
                    name: this.state.newNameValue, 
                    receiver: this.state.newEmailValue,
                    message: path
                }, Data.USER_ID

            ).then(res => {
                this.setState({
                    showWarning: false
                });
                this.props.save(this.state.id, group);
            }).catch(err => {
                this.setState({
                    showWarning: true
                });
            });

        }
    }

    removeMemberFromList = (name, email) => {
        let obj = {name: name, email: email};
        debugger
        let array = this.state.members;

        const index = array.findIndex(o => o.name === obj.name && o.email === obj.email );
        if (index > -1) {
            array.splice(index, 1);
        }

        this.setState({
            members: array
        })

    }

    // it => ( )
    render() {

        if(this.state.id !== -1){
            return (
                //React.Fragment
                <>
                    <div className="frame">
                        <h2>Edycja grupy</h2>
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
    
                        <button className="btn btn-primary" onClick={this.SaveGroup}>Zapisz</button>
    
                        <AddMember addMember={this.AddMember} members={this.state.members}/>
                        <MemberSearch members={this.state.members} removeMember={this.removeMemberFromList}/>
    
                    </div>
    
                </>
            );
        } else {
            return (
                <>
                <h2>Nie znaleziono grupy.</h2>
                </>
            )
        }
    }
}

export default EditGroup;