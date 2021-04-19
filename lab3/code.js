
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

const StudentBox = (props) => {
    return (
        <li>
            <div className="list_el_text_div">
                <ul>
                    <li>{props.name}</li>
                    <li>{props.desc}</li>
                    <li>{props.email}</li>
                    <li>{props.tags}</li>
                </ul>
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
            outputList: [],
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

    render() {
        const myList = this.props.getStudentsList.map(it => (
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
                </div>

                <NumberOfFoundedStudnets numberOfStudent="1"/>

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
        if(this.props.students.includes(student)){
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
                    {this.state.showWarning && <h1 style={{color: "red"}}>{this.errorMessage}</h1> }

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
                <AddUser addStudent={this.addStudent} students={this.state.students}/>
                <Search getStudentsList={this.state.students}/>
            </>
        );
    }
}


ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);