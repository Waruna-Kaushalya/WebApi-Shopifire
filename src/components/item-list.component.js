import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Item = props => (
  <tr>
    <td>{props.item.title}</td>
    <td>{props.item.description}</td>
    <td>{props.item.price}</td>
    <td>{props.item.img}</td>
    <td>
      <Link to={"/edit/" + props.item._id}>edit</Link> | <a style={{ color: "red" }} onClick={() => { props.deleteItem(props.item._id) }}>delete</a>
    </td>
  </tr>
)

export default class ItemList extends Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this)
    this.state = { items: [] };

  }
  componentDidMount() {
    axios.get('http://localhost:5000/items/')
      .then(response => {
        this.setState({ items: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteItem(id) {
    axios.delete('http://localhost:5000/items/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      items: this.state.items.filter(el => el._id !== id)   //item id not equal to id items update(delte)
    })
  }

  itemList() {
    return this.state.items.map(currentitem => {
      return <Item item={currentitem} deleteItem={this.deleteItem} key={currentitem._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Items</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>img</th>
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