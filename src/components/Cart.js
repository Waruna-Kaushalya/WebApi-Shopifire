import React from 'react';
import { Link } from 'react-router-dom';
import { getCartProducts } from '../repository';
import CartItem from './CartItem';
import { storeCart } from '../repository';

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			total: 0,
			quantity: [],
			itemAmount: []

		}
	}

	componentWillMount() {
		if (localStorage.cart) {
			let cart = localStorage.getItem('cart');
			let cart1 = JSON.parse(cart)
			console.log("cart 100")
			console.log(cart1[1])
			if (!cart) return;
			getCartProducts(cart).then((products) => {
				let total = 0;

				products.forEach(element => {
					console.log(element._id)

					total += parseInt(element.price) * cart1[element._id];
				});

				this.setState({ products, total });
			});

		}

	}

	addCartoDB(objectarray) {
		console.log("helloooo addcarttodb")

		var retrievedObject = localStorage.getItem('userObject980');
		var z = JSON.parse(retrievedObject)
		var userid = z._id
		storeCart(userid, objectarray).then(response => { console.log("Response recieved"); window.location.reload(false); })
			.catch();
	}

	removeFromCart = (product) => {
		let products = this.state.products.filter((item) => item._id !== product._id);
		let cart = JSON.parse(localStorage.getItem('cart'));
		delete cart[product._id.toString()];
		localStorage.setItem('cart', JSON.stringify(cart));
		let total = this.state.total - (product.qty * product.price)
		this.setState({ products, total });
		this.addCartoDB(JSON.stringify(cart))
		//window.location.reload(false);
	}


	clearCart = () => {
		var cart = {}
		localStorage.setItem('cart', JSON.stringify(cart));
		this.setState({ products: [] });
		this.addCartoDB(JSON.stringify(cart))
	}

	render() {
		const { products, total } = this.state;
		return (
			<div className=" container">
				<h3 className="card-title">Cart</h3>
				<hr />
				<center>
					{
						products.map((product, index) => <CartItem product={product} remove={this.removeFromCart} key={index} />)
					}
				</center>
				<hr />
				{products.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">Rs. {total}</span></h4><hr /></div> : ''}

				{!products.length ? <h3 className="text-warning">No item on the cart</h3> : ''}
				{/* <Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link> */}
				<button className="btn btn-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>
				<br /><br /><br />
			</div>
		);
	}
}