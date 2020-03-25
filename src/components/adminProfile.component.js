import React from 'react';
import { register } from '../repository';
import jwt_decode from "jwt-decode";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class UserProfile extends React.Component {

  constructor() {
    super();
    this.state = { name: '', email: ''};
    this.handleInputChange = this.handleInputChange.bind(this);
  
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })

  }
  
  componentWillMount() {
    if(localStorage.userObject981)
    {var x=localStorage.getItem("userObject981")
    var x = JSON.parse(x)
    this.setState({name:x.name,email:x.email})}
  
}
  
logOutUser() {
    console.log("LogOut000000000000000000000000000000000000000000000000000")
    localStorage.removeItem("userObject981");
   

    window.location = '/'
  }

  navigateToEditprofile()
  { window.location = '/EditProfile'}
 


  
  render() {
    return (
      <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1>Admin Profile</h1>
            </div>
            <table>
            <tr>
            <td>Name</td><td>:</td><td>{this.state.name}</td>
            
            </tr>
            <tr>
            <td>Email</td><td>:</td><td>{this.state.email}</td>
            
            
            </tr>
            
            
            <tr>
            <td></td><td><button onClick={this.logOutUser}>logout</button></td>
            </tr>
            </table>
         
          </div>
        </div>
      </div>
    );
  }
}