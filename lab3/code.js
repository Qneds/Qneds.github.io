
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
            <ul>
                <li>{props.name}</li>
                <li>{props.desc}</li>
                <li>{props.email}</li>
                <li>{props.tags}</li>
            </ul>
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
        <div>
            <h1>Imie:</h1>
            <input
            type="text"
            name="newName"
            value={props.newNameValue}
            onChange={props.handleOnNameChange}
            />
            <h1>Opis:</h1>
            <input
            type="text"
            name="newDesc"
            value={props.newDescValue}
            onChange={props.handleOnDescChange}
            />
            <h1>E-mail:</h1>
            <input
            type="text"
            name="newEmail"
            value={props.newEmailValue}
            onChange={props.handleOnEmailChange}
            />
            <h1>Tagi:</h1>
            <input
            type="text"
            name="newName"
            value={props.newTagsValue}
            onChange={props.handleOnTagsChange}
            />
        </div>
        
    )
}

class Search extends React.Component {

    state = {
        descSearch: "",
        tagSearch: "",
        getStudentsList: [],
        outputList: []
    }

    handleDescSearchEntry = (event) => {

    }

    handleTagSearchEntry = (event) => {

    }

    render() {
        const myList = this.state.outputList.map(it => (
            <StudentBox name={it.name} desc={it.desc} email={it.email} tags={it.tags} key={hashCode(it.email)} />
        ))
        return (
            //React.Fragment
            <>
                 <input
                    type="text"
                    name="descSearch"
                    value={this.state.descSearch}
                    onChange={this.handleDescSearchEntry}
                />
                <input
                    type="text"
                    name="tagSearch"
                    value={this.state.tagSearch}
                    onChange={this.handleTagSearchEntry}
                />

                <NumberOfFoundedStudnets numberOfStudent="1"/>

                <ul>
                    {myList}
                </ul>

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
    errorMessage = "Wrong entry value"

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

        this.addStudentToList(new Student(this.state.newNameValue, this.state.newDescValue, this.state.newEmailValue,  this.state.newTagsValue))

    }



    // it => ( )
    render() {
        return (
            //React.Fragment
            <>
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

                <button onClick={this.addStudent}>Dodaj studenta</button>


            </>
        );
    }
}


class Main extends React.Component {

    state = {
        students: [new Student("1", "2", "3", "4")]
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
                <AddUser addStudent={this.addStudent}/>
                <Search getStudentsList={this.state.students}/>
            </>
        );
    }
}


ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);