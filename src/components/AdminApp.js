import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./navbar.component" //components/navbar.component
import ItemList from "./item-list.component";
import EditItem from "./edit-item.component";
import CreateItem from "./create-item.component";
import AdminCustomers from "./view-users.component"
import AdminProfile from "./adminProfile.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ItemList} />
        <Route path="/edit/:id" component={EditItem} />
        <Route path="/create" component={CreateItem} />
        <Route path="/admincustomers" component={AdminCustomers} />
        <Route path="/adminprofile" component={AdminProfile} />
      </div>
    </Router>
  );
}

export default App;
