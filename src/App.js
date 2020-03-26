import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/ProductList';
import Cart from './components/Cart';
import AdminLog from './components/AdminLog'
import ItemList from "./components/item-list.component";
import AdminApp from "./components/AdminApp"
import UserProfile from "./components/UserProfile"
import EditProfile from "./components/EditProfile"
import EditPassword from "./components/Editpassword"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';



class App extends Component {

  constructor() {
    super();
    this.state = { loggedinStatus: 'loggedout' };
    this.handleInputChange = this.handleInputChange.bind(this);

  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentWillMount() {
    if (localStorage.userObject980) {
      this.setState({ loggedinStatus: "customer" })
    }
    else if (localStorage.userObject981){
      this.setState({ loggedinStatus: "admin" })
    }
    else{
      this.setState({ loggedinStatus: "loggedout" })
    }
  }
  logOut() {
    localStorage.removeItem('x-access-token');
  }

  render() {

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

              <Link className="navbar-brand" to="/">ShopiFire</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-item nav-link" to="/">Products</Link>

                  {(this.state.loggedinStatus=="customer") ? [<Link className="nav-item nav-link" to="/cart">Cart</Link>] : ''}
                  {
                    (this.state.loggedinStatus=="loggedout") ?
                    ([<Link className="nav-item nav-link float-right" to="/login">Log in</Link>, <Link className="nav-item nav-link float-right" to="/register">Register</Link>]):''
                     
                    //  
                  }

                </div>
                <div class="navbar-nav" >
                { (this.state.loggedinStatus=="admin"||this.state.loggedinStatus=="loggedout") ?
                <Link className="nav-item nav-link" to="/AdminLog">Adminstrator</Link>:''}
               

                  {
                    (this.state.loggedinStatus=="customer") ?
                      (<Link className="nav-item nav-link" to="/UserProfile">User</Link>) : ''
                  }
                </div>
              </div>
            </div>
          </nav>
          <div className="container">
            <br />
            <Route exact path="/" component={Products} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/AdminLog" component={AdminLog} />
            <Route exact path="/AdminItems" component={AdminApp} />
            <Route exact path="/UserProfile" component={UserProfile} />
            <Route exact path="/EditProfile" component={EditProfile} />
            <Route exact path="/EditPassword" component={EditPassword} />
             <Route exact path="/login" component={Login} />
             <Route exact path="/register" component={Register} /> 

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
