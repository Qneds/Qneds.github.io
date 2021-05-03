import { React, Component } from 'react';
import {StudentBox, hashCode, NumberOfFoundedStudnets} from './Support';

import '../../styles/styleStudents.css';

class Search extends Component {

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

        let outpuList = [];

        if(this.state.descSearch === "" && this.state.tagSearch === "")
            return list;

        for(let element of list) {

            if(this.state.descSearch !== "" && element.desc.includes(this.state.descSearch)) {
                outpuList.push(element);
            } else if(this.state.tagSearch !== "") {
                let tags = element.tags.split(/[\s,]+/);

                let tagsFromSearch = this.state.tagSearch.split(/[\s,]+/);

                var arrayLength = tagsFromSearch.length;
                for (let i = 0; i < tags.length; i++){
                    let exit = false;
                    for (let j = 0; j < arrayLength; j++) {
                        if(tags[i].includes(tagsFromSearch[j])){
                            outpuList.push(element);
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

        return outpuList;
    }

    render() {

        let list = this.props.getStudentsList();


        let out = this.searchUpdate(list);

        const myList = out.map(it => (
            <StudentBox name={it.name} desc={it.desc} email={it.email} tags={it.tags} key={hashCode(it.email + it.name)} />
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
                        <NumberOfFoundedStudnets numberOfStudent={out.length}/>
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

export default Search;