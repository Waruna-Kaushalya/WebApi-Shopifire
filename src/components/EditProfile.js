import React from 'react';
import { EditUserDetails } from '../repository';
import jwt_decode from "jwt-decode";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../customcss/button.css"

export default class Register extends React.Component {

  constructor() {
    super();
    this.state = { name: '', email: '', namelabel: '', emaillabel: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitProfileEdit = this.submitProfileEdit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  submitProfileEdit(event) {
    this.clearLabel()
    event.preventDefault();
   EditUserDetails(this.state)
      .then(response => { this.handleResponse(response) })
      .catch(err => console.log(err.response.data.errors));
  }
  handleResponse(response) {
      console.log("Handle resoponse block")
    var x = response.status
    if (x === 200) {
      this.clearTextFields()
      console.log("suscees response 1")
      console.log(response.data.name)
      const token = response.data;

     
     
     
      localStorage.setItem("userObject980", JSON.stringify(token));
      localStorage.setItem("userObject980logstatus", true);
     
      this.showAlert()
    }
    else if (x === 274) {
      this.setState({
        emaillabel: "Email Already Exists"
      });
      this.showErrorAlert()
    }
    else {
      console.log("fail response 1112")
     console.log(response.data.passwordmessage)
      this.setState({
        namelabel: response.data.namemessage,
        emaillabel: response.data.emailmessage,
      });
      this.showErrorAlert()
    }
  }

  showAlert = () => {
    confirmAlert({
      title: 'Edit Successfull!',
      message: 'You have successfully changed your profile details!!!',
      buttons: [
        {
          label: 'OK',
          onClick: () => window.location = '/UserProfile'
        },
      ]
    })
  };

  showErrorAlert = () => {
    confirmAlert({
      title: 'Invalid Details!',
      message: 'Please enter valid details in the realvent text fields',
      buttons: [
        {
          label: 'OK',
          onClick: () => { }
        },
      ]
    })
  };

  tempfunc() {
    this.setState({
      name: 'ffclicked 1'
    });
  }

  clearLabel() {
    this.setState({
      namelabel: '',
      emaillabel: ''
    });
  }

  clearTextFields() {
    this.setState({
      name: '',
      email: ''
    });

  }
  tempfunc2() {
    if (localStorage.userObject980) {
      var retrievedObject = localStorage.getItem('userObject980');
      var retrievedObject2 = localStorage.getItem('userObject980logstatus');
      var z = JSON.parse(retrievedObject)
      console.log("zonet")
      console.log(z.name);
      console.log(z.email);
      console.log("logstatus")
      console.log(retrievedObject2)
    }
    else { console.log("user logged out") }

  }
  navigateToPassword()
  { window.location = '/EditPassword'}



  logOutUser() {
    console.log("LogOut000000000000000000000000000000000000000000000000000")
    localStorage.removeItem("userObject980");
    localStorage.removeItem("userObject980logstatus")
  }

  componentWillMount() {
    var x=localStorage.getItem("userObject980")
    var x = JSON.parse(x)
    this.setState({name:x.name,email:x.email})
  }
  backButton()
  {window.location = '/UserProfile'}

  render() {
    return (
      <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1>Edit Profile</h1>
            </div>
            <div className="panel-body">
              <form onSubmit={this.submitProfileEdit}>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" onChange={this.handleInputChange} value={this.state.name} />
                  <label><font color="red">{this.state.namelabel}</font></label>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="text" className="form-control" name="email" onChange={this.handleInputChange} value={this.state.email} />
                  <label><font color="red">{this.state.emaillabel}</font></label>
                </div>
                
              
                <button type="submit" class="login">Submit</button><br/>
               
              </form>
              <p></p>
              <p>
              <button class="login" onClick={this.navigateToPassword}>Edit Password</button> <button class="logout" onClick={this.backButton}>Cancel</button></p>
             
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}