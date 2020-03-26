import React from 'react';
import { adminLog } from '../repository';
import "../customcss/button.css"

export default class AdminLog extends React.Component {

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
    event.preventDefault();
    this.clearLabel()
    adminLog(this.state)
      .then(response => { this.handleResponse(response) })
      .catch(err => alert(err));
  }


  handleResponse(response) {
    var x = response.status
    console.log("status sis")
    console.log(x)
    if (x === 200) {
      this.clearTextFields()
      console.log("suscees response 1")

      const token = response.data;


      localStorage.setItem("userObject981", JSON.stringify(token));


      window.location = '/AdminItems/'


    }
    else if (x === 274) {
      console.log("fail response  empty274")
      this.setState({

        emaillabel: "Email does not exist"

      });
    }
    else if (x === 275) {
      console.log("fail response  empty 1112")
      this.setState({

        passwordlabel: "The password which you enterd is incorrect"

      });
    }
    else {
      this.setState({
        emaillabel: response.data.emailmessage,
        passwordlabel: response.data.passwordmessage,
      });
    }

  }
  logOutUser() {
    console.log("LogOut000000000000000000000000000000000000000000000000000")
    localStorage.removeItem("userObject980");
    localStorage.removeItem("userObject980logstatus")
    localStorage.removeItem("cart")
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
  componentWillMount() {
    if (localStorage.userObject981) {
      window.location = '/AdminItems/'
    }
  }

  tempfunc2() {
    window.location = '/AdminItems/'


  }

  tempfunc3() {
    // alert.show(<div style={{ color: 'blue' }}>Some Message</div>)
    if (localStorage.userObject980) {
      var retrievedObject = localStorage.getItem('userObject980');
      var retrievedObject2 = localStorage.getItem('userObject980logstatus');//userObject980logstatus
      var z = JSON.parse(retrievedObject)
      console.log("ord user")
      console.log(z.name);
      console.log(z.email);
      console.log(z._id)
      console.log("logstatus")
      console.log(retrievedObject2)
    }
    else if (localStorage.userObject981) {
      var retrievedObject = localStorage.getItem('userObject981');
      // var retrievedObject2 = localStorage.getItem('userObject980logstatus');//userObject980logstatus
      var z = JSON.parse(retrievedObject)
      console.log("Admin user")
      console.log(z.name);
      console.log(z.email);
      console.log(z._id)
      console.log("logstatus")
      console.log(retrievedObject2)
    }
    else { console.log("user logged out") }

  }

  render() {
    return (
      <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3>Adminstrator Options </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.submitLogin}>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" className="form-control" name="name" onChange={this.handleInputChange} />
                  <label><font color="red">{this.state.emaillabel}</font></label>
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" name="password" onChange={this.handleInputChange} />
                  <label><font color="red">{this.state.passwordlabel}</font></label>
                </div>
                <button type="submit" class="login">Sign In</button>
              </form>
              <br />

            </div>
          </div>
        </div>
      </div>
    );
  }
}
