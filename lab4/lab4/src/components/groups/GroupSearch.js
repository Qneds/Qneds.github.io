import { React, Component } from 'react';

import {hashCode, NumberOfGroups, GroupBox} from './Support'

class GroupSearch extends Component {

    constructor(props) {
        super(props);
     
        this.state = {
            descSearch: "",
            tagSearch: "",
        };
    }
    handleDescSearchEntry = (event) => {
        this.setState({
            descSearch: event.target.value
        });
    }

    handleTagSearchEntry = (event) => {
        this.setState({
            tagSearch: event.target.value
        });
    }

    searchUpdate(list) {

        let outputList = [];

        if(this.state.descSearch === "" && this.state.tagSearch === "")
            return list;

        for(let element of list) {

            if(this.state.descSearch !== "" && element.desc.includes(this.state.descSearch)) {
                outputList.push(element);
            } else if(this.state.tagSearch !== "") {
                let tags = element.tags.split(/[\s,]+/);

                let tagsFromSearch = this.state.tagSearch.split(/[\s,]+/);

                var arrayLength = tagsFromSearch.length;
                for (let i = 0; i < tags.length; i++){
                    let exit = false;
                    for (let j = 0; j < arrayLength; j++) {
                        if(tags[i].includes(tagsFromSearch[j])){
                            outputList.push(element);
                            exit = true;
                            break;
                        }
                    }
                    if (exit) {
                        break;
                    }
                }
            }
        }

        return outputList;
    }

    render() {

        let list = this.props.getGroupList();


        let out = this.searchUpdate(list);

        const myList = out.map(it => (
            <GroupBox name={it.name} desc={it.desc} email={it.email} tags={it.tags} members={it.members} key={hashCode(it.email + it.name)}/>
        ));

        return (
            //React.Fragment
            <>
                <div className="frame">
                    <div className="container cont">
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm2">Wyszukuj po opisie i nazwie</span>
                            </div>
                            <input type="text" name="descSearch" value={this.state.descSearch} id="searchDesc" className="form-control" aria-label="Small" onInput={this.handleDescSearchEntry} aria-describedby="inputGroup-sizing-sm"/>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm2">Wyszukuj po tagach</span>
                            </div>
                            <input type="text" name="tagSearch" value={this.state.tagSearch} id="searchTags" className="form-control" aria-label="Small" onInput={this.handleTagSearchEntry} aria-describedby="inputGroup-sizing-sm"/>
                        </div>
                    </div>
                    <div>
                        <NumberOfGroups amountOfGroups={out.length}/>
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

export default GroupSearch;