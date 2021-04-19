
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

const StudentBox = (props) => (
    <li>
        <ul>
            <li>{props.name}</li>
            <li>{props.desc}</li>
            <li>{props.email}</li>
            <li>{props.tags}</li>
        </ul>
    </li>
)

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



    handleEnter = (event) => {
        if(event.code === "Enter"){
            if(this.state.toDoList.includes(this.state.newItemValue)){
                this.setState({
                    showWarning: true
                });
            } else {
                this.setState({
                    toDoList: this.state.toDoList.concat(this.state.newItemValue),
                    newItemValue: "",
                    showWarning: false

                });
            }
        } else {
            this.setState({
                showWarning: false
            });
        }
    }
    // it => ( )
    render() {
        return (
            //React.Fragment
            <>
                <h2>Dodawanie nowego studenta</h2>
                <AddStudentBox
                    newNameValue={this.state.newNameValue}
                    onChange={this.handleNameEntry}


                    newNameValue={this.state.newDescValue}
                    onChange={this.handleDescEntry}


                    newNameValue={this.state.newEmailValue}
                    onChange={this.handleEmailEntry}
  
                    newNameValue={this.state.newTagsValue}
                    onChange={this.handleTagsEntry}
                />

                <button onClick="addStudent">Dodaj studenta</button>


            </>
        );
    }
}


class Main extends React.Component {

    state = {
        students: []
    }

    addStudent = (student) => {
        this.state.students.push(student);
    }

    getStudentsList = () => {
        return this.state.students;
    }


    render() {
        const myList = this.state.students.map(it => (
            <StudentBox name={it.name} desc={it.desc} email={it.email} tags={it.tags} key={hashCode(it.email)} />
        ))
        return (
            //React.Fragment
            <>
                <AddUser addStudent={this.addStudent}/>
                <ul>
                    {myList}
                </ul>
            </>
        );
    }
}


ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);