import React from 'react';
import { Editpassword } from '../repository';
import jwt_decode from "jwt-decode";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../customcss/button.css"

export default class Register extends React.Component {

  constructor() {
    super();
    this.state = { oldpassword: '', npassword: '', rnpassword: '', oldpasswordlabel: '', npasswordlabel: '', rnpasswordlabel: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitProfileEdit = this.submitProfileEdit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  submitProfileEdit(event) {
    this.clearLabel()
    event.preventDefault();
    Editpassword(this.state)
      .then(response => {
        this.handleResponse(response)
      })
      .catch(
        //err => console.log(err.response.data.errors)
      );
  }
  handleResponse(response) {
    console.log("Handle resoponse block")
    var x = response.status
    if (x === 200) {
      this.clearTextFields()
      this.clearLabel()


      this.showAlert()
    }
    else if (x === 275) {
      this.setState({
        oldpasswordlabel: "The  current password which you enterd is incorrect."
      });
      this.showErrorAlert()
    }
    else {
      console.log("fail response 1112")
      console.log(response.data.passwordmessage)
      this.setState({
        oldpasswordlabel: response.data.oldpasswordmessage,
        npasswordlabel: response.data.npasswordmessage,
        rnpasswordlabel: response.data.rnpasswordmessage
      });
      this.showErrorAlert()
    }
  }

  showAlert = () => {
    confirmAlert({
      title: 'Success!',
      message: 'You have successfully changed your password!!!',
      buttons: [
        {
          label: 'OK',
          onClick: () => {
          window.location = '/UserProfile'
          }
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
      oldpasswordlabel: '',
      npasswordlabel: '',
      rnpasswordlabel: ''
    });
  }

  clearTextFields() {
    this.setState({
      oldpassword: '',
      npassword: '',
      rnpassword: ''
    });

  }
  backButton() {
    window.location = '/UserProfile'

  }
  logOutUser() {
    console.log("LogOut000000000000000000000000000000000000000000000000000")
    localStorage.removeItem("userObject980");
    localStorage.removeItem("userObject980logstatus")
  }

  componentWillMount() {

  }

  render() {
    return (
      <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1>Change Password</h1>
            </div>
            <div className="panel-body">
              <form onSubmit={this.submitProfileEdit}>
                <div className="form-group">
                  <label>Current Password:</label>
                  <input type="password" className="form-control" name="oldpassword" onChange={this.handleInputChange} value={this.state.oldpassword} />
                  <label><font color="red">{this.state.oldpasswordlabel}</font></label>
                </div>
                <div className="form-group">
                  <label>New Password:</label>
                  <input type="password" className="form-control" name="npassword" onChange={this.handleInputChange} value={this.state.npassword} />
                  <label><font color="red">{this.state.npasswordlabel}</font></label>
                </div>
                <div className="form-group">
                  <label> Repeat New Password:</label>
                  <input type="password" className="form-control" name="rnpassword" onChange={this.handleInputChange} value={this.state.rnpassword} />
                  <label><font color="red">{this.state.rnpasswordlabel}</font></label>
                </div>


                <button type="submit" className="login">Submit</button> <br />

              </form>
              <br />
              <button class="logout" onClick={this.backButton}>Cancel</button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}