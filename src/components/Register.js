import React from 'react';
import { register } from '../repository';
import jwt_decode from "jwt-decode";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class Register extends React.Component {

  constructor() {
    super();
    this.state = { name: '', password: '', rpassword: '', email: '', namelabel: '', emaillabel: '', passwordlabel: '', rpasswordlabel: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  submitRegister(event) {

    this.clearLabel()

    // this.tempfunc();
    event.preventDefault();
    register(this.state)
      .then(response => { this.handleResponse(response) })                           //token => window.location = '/' //token =>this.tempfunc()
      .catch(err => console.log(err.response.data.errors));
  }
  handleResponse(response) {
    var x = response.status
    if (x === 200) {
      this.clearTextFields()
      console.log("suscees response 1")
      console.log(response.data.name)
      const token = response.data;
      console.log("response name")
      console.log(token.name)
      var testObject = { 'one': 651, 'two': 2, 'three': 3 };
      console.log(testObject.one)
      localStorage.setItem("userObject980", JSON.stringify(token));
      localStorage.setItem("userObject980logstatus", true);
      localStorage.setItem("jwtToken1", "tokengraphy");
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
        passwordlabel: response.data.passwordmessage,
        rpasswordlabel: response.data.rpasswordmessage

      });
      this.showErrorAlert()
    }
  }

  showAlert = () => {

    confirmAlert({
      title: 'Registration Successfull!',
      message: 'You have successfully registerd your account.\n Welcome to ShopiFire!!!',
      buttons: [
        {
          label: 'OK',
          onClick: () => window.location = '/'
        },

      ]
    })//.showAlert();

  };

  showErrorAlert = () => {
    // const r =window.alert("Do you really want to Sign Out?"); if(r == true){ }
    confirmAlert({
      title: 'Invalid Details!',
      message: 'Please enter valid details in the realvent text fields',
      buttons: [
        {
          label: 'OK',
          onClick: () => { }
        },

      ]
    })//.showAlert();
  };

  tempfunc() {
    this.setState({
      name: 'ffclicked 1'
    });
  }

  clearLabel() {
    this.setState({
      namelabel: '',
      emaillabel: '',
      passwordlabel: '',
      rpasswordlabel: ''

    });
  }

  clearTextFields() {
    this.setState({
      name: '',
      email: '',
      password: '',
      rpassword: ''

    });

  }
  tempfunc2() {
    // alert.show(<div style={{ color: 'blue' }}>Some Message</div>)
    if (localStorage.userObject980) {
      var retrievedObject = localStorage.getItem('userObject980');
      var retrievedObject2 = localStorage.getItem('userObject980logstatus');//userObject980logstatus
      var z = JSON.parse(retrievedObject)
      console.log("zonet")
      console.log(z.name);
      console.log(z.email);
      console.log("logstatus")
      console.log(retrievedObject2)
    }
    else { console.log("user logged out") }

  }
  logOutUser() {
    console.log("LogOut000000000000000000000000000000000000000000000000000")
    localStorage.removeItem("userObject980");
    localStorage.removeItem("userObject980logstatus")
  }

  render() {
    return (
      <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3>Register</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.submitRegister}>
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
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" name="password" onChange={this.handleInputChange} value={this.state.password} />
                  <label><font color="red">{this.state.passwordlabel}</font></label>
                </div>
                <div className="form-group">
                  <label>Repeat Password:</label>
                  <input type="password" className="form-control" name="rpassword" onChange={this.handleInputChange} value={this.state.rpassword} />
                  <label><font color="red">{this.state.rpasswordlabel}</font></label>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>
              <button onClick={this.tempfunc2}>getstorage</button>
              <button onClick={this.logOutUser}>logout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}