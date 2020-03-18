import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminLog from './components/AdminLog'
import ItemList from "./components/item-list.component";
import AdminApp from "./components/AdminApp"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { isAuthenticated } from './repository';


class App extends Component {

  constructor() {
    super();
    this.state = { loggedinStatus: '' };
    this.handleInputChange = this.handleInputChange.bind(this);

  }
  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentWillMount() {
    if (localStorage.userObject980) {
      this.setState({ loggedinStatus: true })
    }
    else {
      this.setState({ loggedinStatus: false })
    }
  }
  logOut() {
    localStorage.removeItem('x-access-token');
  }

  render() {
    const auth = isAuthenticated();
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

                  {(this.state.loggedinStatus) ? [<Link className="nav-item nav-link" to="/cart">Cart</Link>, <Link className="nav-item nav-link" to="/checkout">Checkout</Link>] : ''}
                  {
                    (this.state.loggedinStatus) ?
                      (<a className="nav-item nav-link" href="/" onClick={this.logOut}>Log out</a>) :
                      ([<Link className="nav-item nav-link float-right" to="/login">Log in</Link>, <Link className="nav-item nav-link float-right" to="/register">Register</Link>])
                    //  
                  }

                </div>
                <div class="navbar-nav" >
                  <Link className="nav-item nav-link" to="/AdminLog">Admin</Link>

                  {
                    (this.state.loggedinStatus) ?
                      (<Link className="nav-item nav-link" to="/">User</Link>) : ''
                  }
                </div>
              </div>
            </div>
          </nav>
          <div className="container">
            <br />
            <Route exact path="/" component={Products} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/AdminLog" component={AdminLog} />
            <Route exact path="/AdminItems" component={AdminApp} />
            {(!auth) ? <Route exact path="/login" component={Login} /> : ''}
            {(!auth) ? <Route exact path="/register" component={Register} /> : ''}

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
