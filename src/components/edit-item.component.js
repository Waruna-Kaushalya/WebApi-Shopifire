import React, { Component } from 'react';
import axios from 'axios';

export default class EditItem extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);        // bind values
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeID = this.onChangeID.bind(this);

        this.state = {
            title: '',
            description: '',
            price: 0,
            img: '',
            id: 0
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/items/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    price: response.data.price,
                    img: response.data.img,
                    id: response.data.id,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChangeID(e) {
        this.setState({
            id: e.target.value
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }
    onChangeImg(e) {
        this.setState({
            img: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const item = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            img: this.state.img,
            id: this.state.id
        }
        console.log(item);
        axios.post('http://localhost:5000/items/update/' + this.props.match.params.id, item)
            .then(res => console.log(res.data));
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Item</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Item ID: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Id}
                            onChange={this.onChangeID}
                        />
                    </div>

                    <div className="form-group">
                        <label>Item Title: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>

                    <div className="form-group">
                        <label>Item Discrption: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label>Item Price: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </div>

                    <div className="form-group">
                        <label>Item Image URL: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.img}
                            onChange={this.onChangeImg}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Item" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}    