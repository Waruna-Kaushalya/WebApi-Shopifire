import React from 'react';
import { register } from '../repository';
import jwt_decode from "jwt-decode";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../customcss/button.css"

export default class UserProfile extends React.Component {

  constructor() {
    super();
    this.state = { name: '', email: '' };
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })

  }

  componentWillMount() {
    var x = localStorage.getItem("userObject980")
    var x = JSON.parse(x)
    this.setState({ name: x.name, email: x.email })
  }

  logOutUser() {
    console.log("LogOut000000000000000000000000000000000000000000000000000")
    localStorage.removeItem("userObject980");
    localStorage.removeItem("userObject980logstatus")
    localStorage.removeItem("cart")
    window.location = '/'
  }

  navigateToEditprofile() { window.location = '/EditProfile' }




  render() {
    return (
      <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1>User Profile</h1>
            </div>
            <table>
              <tr>
                <td>Name</td><td>:</td><td>{this.state.name}</td>

              </tr>
              <tr>
                <td>Email</td><td>:</td><td>{this.state.email}</td>


              </tr>


              <tr>
                <td><button class="login" onClick={this.navigateToEditprofile}>Edit Profile</button></td><td></td><td><button class="logout" onClick={this.logOutUser}>Sign Out</button></td>
              </tr>
            </table>

          </div>
        </div>
      </div>
    );
  }
}