import { React, Component } from 'react';

class AddMember extends Component {

    state = {
        name: "",
        email: "",
        showWarning: false
    }

    errorMessage = "Członek z danym e-mailem i imieniem już istnieje."

    handleNameEntry = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    handleEmailEntry = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    AddMemberToGroup = () => {
        if(this.state.name === "" || this.state.email === "" )
            return;
        
        let found = false;
        for(var i = 0; i < this.props.members.length; i++) {
            if (this.props.members[i].email === this.state.email && this.props.members[i].name === this.state.name) {
                found = true;
                break;
            }
        }
        
        if(found){
            this.setState({
                showWarning: true
            });
            return;
        }
        
        this.props.addMember(this.state.name, this.state.email)
        this.setState({
            name: "",
            email: "",
            showWarning: false
        });
        
    }

    render() {
        return (
            //React.Fragment
            <>
                <div className="frame">
                    <h2>Dodawanie członka do grupy</h2>
                    <AddMemberBox
                    name={this.state.name}
                    handleOnNameChange={this.handleNameEntry}


                    email={this.state.email}
                    handleOnEmailChange={this.handleEmailEntry}

                    />
                    {this.state.showWarning && <h3 style={{color: "red"}}>{this.errorMessage}</h3> }

                    <button className="btn btn-primary" onClick={this.AddMemberToGroup}>Dodaj członka do grupy</button>

                </div>

            </>
        );
    }

}

const AddMemberBox = (props) => {
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
                    value={props.name}
                    onChange={props.handleOnNameChange}
                    />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm2">Email:</span>
                    </div>
                    <input
                    type="text"
                    name="newDesc"
                    className="form-control" 
                    aria-label="Small"
                    value={props.email}
                    onChange={props.handleOnEmailChange}
                    />
                </div>
            </div>
        </div>
        
    )
}

export default AddMember;