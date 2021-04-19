
function hashCode(str) {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

class Student {
    constructor(name, desc, email, tags) {
      this.name = name;
      this.desc = desc;
      this.email = email;
      this.tags = tags;
    }
}

const TagBox = (props) => {
    return (
        <div className="tag">
            {props.tag}
        </div>
    )
}


const StudentBox = (props) => {

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
    )
}

const NumberOfFoundedStudnets = (props) => {
    return (
        <div>
            Znaleziono {props.numberOfStudent} studentów
        </div>
    )
}

const AddStudentBox = (props) => {
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
        
    )
}

class Search extends React.Component {

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

        let list = this.props.getStudentsList;


        let out = this.searchUpdate(list);

        const myList = out.map(it => (
            <StudentBox name={it.name} desc={it.desc} email={it.email} tags={it.tags} key={hashCode(it.email)} />
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


class AddUser extends React.Component {

    state = {
        newNameValue: "",
        newDescValue: "",
        newEmailValue: "",
        newTagsValue: "",
        showWarning: false
    }
    errorMessage = "Student z danym e-mailem już istnieje."

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

        let student = new Student(this.state.newNameValue, this.state.newDescValue, this.state.newEmailValue,  this.state.newTagsValue)

        let found = false;
        for(var i = 0; i < this.props.students.length; i++) {
            if (this.props.students[i].email === student.email) {
                found = true;
                break;
            }
        }


        if(this.state.newNameValue === "" || this.state.newDescValue === "" || this.state.newEmailValue === "" ||  this.state.newTagsValue === "")
            return;

        if(found){
            this.setState({
                showWarning: true
            });
        } else {
            this.setState({
                newNameValue: "",
                newDescValue: "",
                newEmailValue: "",
                newTagsValue: "",
                showWarning: false
            });
            this.addStudentToList(student)
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


class Main extends React.Component {

    state = {
        students: []
    }

    addStudent = (student) => {
        this.setState({
            students: this.state.students.concat(student)
        });
        
    }

    getStudentsList = () => {
        return this.state.students;
    }

    render() {

        return (
            //React.Fragment
            <>
                <div className="myFloat">
                    <Search getStudentsList={this.state.students}/>
                </div>
                <div className="myFloat">
                    <AddUser addStudent={this.addStudent} students={this.state.students}/>
                </div>
                
                
            </>
        );
    }
}


ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);