import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>

    <td>
      <a href="#" onClick={() => { props.deleteItem(props.user._id) }}>delete</a>
    </td>
  </tr>
)

export default class ItemList extends Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this)
    this.state = { users: [] };

  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/customers')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteItem(id) {
    axios.delete('http://localhost:5000/api/customers/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      users: this.state.users.filter(el => el._id !== id)   //item id not equal to id items update(delte)
    })
  }

  itemList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser} deleteItem={this.deleteItem} key={currentuser._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Customer List</h3>
        <table className="table">
          <thead className="thead-light">

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.itemList()}
          </tbody>
        </table>
      </div>
    )
  }
}    