import { React, Component } from 'react';

import {MemberBox, NumberOfMembers, hashCode} from './Support'

class MemberSearch extends Component {

    constructor(props) {
        super(props);
     
        this.state = {
            nameSearch: "",
        };
    }
    handleNameSearchEntry = (event) => {
        this.setState({
            nameSearch: event.target.value
        });
    }

    searchUpdate(list) {

        let outputList = [];

        if(this.state.nameSearch === "")
            return list;

        for(let element of list) {

            if(this.state.nameSearch !== "" && element.name.includes(this.state.nameSearch)) {
                outputList.push(element);
            } 
        }

        return outputList;
    }

    render() {

        let list = this.props.members;


        let out = this.searchUpdate(list);

        const myList = out.map(it => (
            <MemberBox name={it.name} email={it.email} removeMember={this.props.removeMember} key={hashCode(it.email + it.name)} />
        ));

        return (
            //React.Fragment
            <>
                <div className="frame">
                    <div className="container cont">
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm2">Wyszukuj po opisie</span>
                            </div>
                            <input type="text" name="descSearch" value={this.state.nameSearch} id="searchDesc" className="form-control" aria-label="Small" onInput={this.handleNameSearchEntry} aria-describedby="inputGroup-sizing-sm"/>
                        </div>
                    </div>
                    <div>
                        <NumberOfMembers amountOfMembers={out.length}/>
                    </div>
                </div>

                

                <div className="frame">
                    <ul className="list-group">
                        {myList}
                    </ul>
                </div>
                

            </>
        );
    }
}

export default MemberSearch;