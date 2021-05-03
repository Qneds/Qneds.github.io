import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import AddUser from './students/AddUser';
import Search from './students/Search';
import GroupSearch from './groups/GroupSearch';

import '../styles/styleStudents.css';
import AddGroup from './groups/AddGroup';
import EditUser from './students/EditUser';
import EditGroup from './groups/EditGroup';


import USER_ID from '../data/data';
import emailjs from 'emailjs-com';
emailjs.init(USER_ID);

class Main extends Component {

    state = {
        students: [],
        groups: []
    }

    addStudent = (student) => {
        //this.setState({
        //    students: this.state.students.concat(student)
        //});
        
        let sList = localStorage.getItem('lab5students');
        sList = JSON.parse(sList);
        sList = sList.concat(student);
        localStorage.setItem('lab5students', JSON.stringify(sList) );
    }

    addGroup = (group) => {
        //this.setState({
        //    groups: this.state.groups.concat(group)
        //});
        let gList = localStorage.getItem('lab5groups');
        gList = JSON.parse(gList);
        gList = gList.concat(group);
        localStorage.setItem('lab5groups', JSON.stringify(gList) );
    }

    saveStudent = (id, student) => {
        let sList = localStorage.getItem('lab5students');
        sList = JSON.parse(sList);
        sList[id] = student;
        localStorage.setItem('lab5students', JSON.stringify(sList) );
    }

    saveGroup = (id, group) => {
        let gList = localStorage.getItem('lab5groups');
        gList = JSON.parse(gList);
        gList[id] = group;
        localStorage.setItem('lab5groups', JSON.stringify(gList) );
    }

    getStudentsList = () => {
        let sList = localStorage.getItem('lab5students');
        if (sList === null){
            localStorage.setItem('lab5students', JSON.stringify([]) );
            sList = localStorage.getItem('lab5students');
        }
        //debugger
        sList = JSON.parse(sList);
        //debugger
        return sList;
        
        
    }

    getGroupList = () => {
        let gList = localStorage.getItem('lab5groups');
        if (gList === null){
            localStorage.setItem('lab5groups', JSON.stringify([]) );
            gList = localStorage.getItem('lab5groups');
        }
        return JSON.parse(gList);
    }


    render() {

        return (
            //React.Fragment
            <>

                <Switch>
                    <Route path="/" exact>
                        <div className="myFloat">
                            <Search getStudentsList={this.getStudentsList}/>
                        </div>
                    </Route>
                    <Route path="/newStudent">
                        <div className="myFloat">
                            <AddUser addStudent={this.addStudent} students={this.getStudentsList}/>
                        </div>
                    </Route>
                    <Route path="/groups">
                        <div className="myFloat">
                            <GroupSearch getGroupList={this.getGroupList}/>
                        </div>
                    </Route>
                    <Route path="/newGroup">
                        <div className="myFloat">
                            <AddGroup addGroup={this.addGroup} getGroupList={this.getGroupList} getStudentsList={this.getStudentsList}/>
                        </div>
                    </Route>
                    <Route path="/editStudent">
                        <div className="myFloat">
                            <EditUser students={this.getStudentsList} save={this.saveStudent}/>
                        </div>
                    </Route>
                    <Route path="/editGroup">
                    <div className="myFloat">
                            <EditGroup save={this.saveGroup} getGroupList={this.getGroupList} getStudentsList={this.getStudentsList}/>
                        </div>
                    </Route>
                    <Route>
                        <section><h1>Error 404 - not found</h1></section>
                    </Route>
                </Switch>

                
                
               
                
            </>
        );
    }
}

export default Main;
