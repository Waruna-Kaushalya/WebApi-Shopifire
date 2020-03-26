import React from 'react';
import { login } from '../repository';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../customcss/button.css"

export default class Login extends React.Component {

  constructor() {
    super();
    this.state = { name: '', password: '', emaillabel: '', passwordlabel: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  submitLogin(event) {
    this.clearLabel()
    event.preventDefault();
    login(this.state)
      .then(response => { this.handleResponse(response) })
      .catch(err => console.log(err.response.data.errors));
  }

  handleResponse(response) {
    var x = response.status
    console.log("status sis")
    console.log(x)
    if (x === 200) {
      console.log("suscees response 1")
      this.clearTextFields()
      //console.log(response.data.name)
      const token = response.data;
      //console.log("response name")
      //console.log(token.name)
      //var testObject = { 'one': 651, 'two': 2, 'three': 3 };
     // console.log(testObject.one)
      localStorage.setItem("userObject980", JSON.stringify(token));
      localStorage.setItem("userObject980logstatus", true);
      localStorage.setItem("jwtToken1", "tokengraphy");
      var cart = JSON.parse(response.data.cart)
      localStorage.setItem('cart', JSON.stringify(cart));
      this.showAlert()

    }
    else if (x === 274) {
      this.showErrorAlert()
      this.setState({
        emaillabel: "The email address which you enterd does nort exist."
      });
    }
    else if (x === 275) {
      this.showErrorAlert()
      this.setState({
        passwordlabel: "The password which you enterd is incorrect."
      });
    }
    else {
      this.showErrorAlert()
      console.log("fail response  empty 1112")
      console.log(response.data.passwordmessage)
      this.setState({
        emaillabel: response.data.emailmessage,
        passwordlabel: response.data.passwordmessage,
      });
    }
  }

  clearLabel() {
    this.setState({
      passwordlabel: '',
      emaillabel: ''
    });
  }

  clearTextFields() {
    this.setState({
      name: '',
      password: ''
    });

  }

  showAlert = () => {
    confirmAlert({
      title: 'Sign In Successful!',
      message: 'You have successfully signed into your account.\n Welcome to ShopiFire!!!',
      buttons: [
        {
          label: 'OK',
          onClick: () => window.location = '/'
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

  tempfunc2() {
    var a = localStorage.getItem('jwtToken');
    console.log(a.name)
  }

  render() {
    return (
      <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3>Log in </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.submitLogin}>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" onChange={this.handleInputChange} value={this.state.name} />
                  <label><font color="red">{this.state.emaillabel}</font></label>
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" name="password" onChange={this.handleInputChange} value={this.state.password} />
                  <label><font color="red">{this.state.passwordlabel}</font></label>
                </div>
                <button type="submit" class="login">Sign In</button>
              </form>
              <button onClick={this.tempfunc2}>getstorage</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
