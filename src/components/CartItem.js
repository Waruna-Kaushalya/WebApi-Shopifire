import React from 'react';
import { storeCart } from '../repository';

export default class CartItem extends React.Component {

	constructor(props) {
		super(props);


		this.state = {
			quantity: 1,
			productAmount: 0,
			productId: 0

		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.temp1 = this.temp1.bind(this);
		this.temp2 = this.temp2.bind(this);
	}
	handleInputChange(event) {
		this.setState({ [event.target.name]: event.target.value });
		this.temp1();
	}
	temp1() {
		console.log("id----------------------------")
		console.log(this.state.productId)
		console.log("qauntity----------------------------")
		console.log(this.state.quantity)
		let cart = localStorage.getItem('cart');
		let cart1 = JSON.parse(cart)
		let qty = parseInt(this.state.quantity) + 1
		cart1[this.state.productId] = qty
		localStorage.setItem('cart', JSON.stringify(cart1));
		console.log("hello temp 1")
		this.addCartoDB(JSON.stringify(cart1))
		//window.location.reload(false);
	}
	temp2() {
		console.log("id----------------------------")
		console.log(this.state.productId)
		console.log("qauntity----------------------------")
		console.log(this.state.quantity)
		let cart = localStorage.getItem('cart');
		let cart1 = JSON.parse(cart)
		let qty = parseInt(this.state.quantity) - 1
		cart1[this.state.productId] = qty
		localStorage.setItem('cart', JSON.stringify(cart1));
		this.addCartoDB(JSON.stringify(cart1))
		//window.location.reload(false);
	}

	componentDidMount() {
		//Get this.props
		const { product } = this.props;
		let cart = localStorage.getItem('cart');
		let cart1 = JSON.parse(cart)
		this.setState({ productId: product._id, quantity: cart1[product._id] });

	};

	addCartoDB(objectarray) {
		console.log("helloooo addcarttodb")

		var retrievedObject = localStorage.getItem('userObject980');
		var z = JSON.parse(retrievedObject)
		var userid = z._id
		storeCart(userid, objectarray).then(response => { console.log("Response recieved"); window.location.reload(false); })
			.catch();
	}

	render() {
		const { product } = this.props;
		return (
			<div className="card" style={{ width: "30rem" }}>
				<div className="card-body">
					<center>
						<div className="col">
							<table>
								<tr><td width="300px">
									<img className="card-img-top" src={product.img} alt="Card image cap" style={{ width: "16rem", marginRight: "15px", marginBottom: "15px" }} />
								</td>
									<td style={{ width: "16rem", marginRight: "15px", marginBottom: "15px" }}>
										<h4 className="card-title">{product.title}</h4>
										<h5 className="card-text"><small>price: </small>Rs.{product.price}</h5>
										<table><tr><td>
											<button type="button" className="btn btn-outline-info" onClick={this.temp2} style={{ width: "30px", height: "40px" }} >-</button>
										</td><td>
												<input type="text" className="form-control" value={this.state.quantity} name="quantity" onChange={this.handleInputChange} style={{ width: "50px", height: "40px" }} />
											</td><td>
												<button type="button" className="btn btn-outline-info" onClick={this.temp1} style={{ width: "30px", height: "40px" }}>+</button><br />
											</td></tr></table>
										<span className="card-text text-success"><small>Quantity: </small>{this.state.quantity}</span>
										<h5 ><small>price: </small>Rs.{product.price * parseInt(this.state.quantity)}</h5>
										<button className="btn btn-sm btn-warning " onClick={() => this.props.remove(product)}>Remove from cart</button>
									</td></tr>
							</table>
						</div>
					</center>
				</div>
			</div>
		)
	}
}