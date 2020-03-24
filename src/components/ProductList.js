import React from 'react';
import ProductItem from './ProductItem';
import { getProducts } from '../repository';
import { Link } from 'react-router-dom';
import { searchFunction1} from '../repository';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import "../customcss/menu.css"

export default class ProductList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			search:'',

			value: {
				min: 5,
				max: 10,
			  },
			  packaging:'a',
			  originlocation:'o'
		}
		this.searchFunction=this.searchFunction.bind(this);
		this.handleInputChange =this.handleInputChange.bind(this);
		this.handlePackagingChange = this.handlePackagingChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.reload = this.reload.bind(this);
		
	}
	reload()
	{getProducts().then((products) => {
		this.setState({ products });
	});}
	
	handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value})
	  }

	  handlePackagingChange = (event) => {
		this.setState({
		  packaging: event.currentTarget.value
		})
	  };

	  handleLocationChange = (event) => {
		this.setState({
			originlocation: event.currentTarget.value
		})
	  };
	  

	  searchFunction()
	  {console.log("search button")
	  console.log(this.state.packaging)
	  console.log(this.state.originlocation)
	  console.log(this.state.search)
	  console.log(this.state.value.max)//,this.state.packaging,this.state.originlocation,this.state.value.min,this.state.value.max
	  searchFunction1(this.state.search,this.state.packaging,this.state.originlocation,this.state.value.min,this.state.value.max).then((products) => {
		 // console.log(products1)
		  this.setState({ products });
	  });
  }

	componentWillMount() {
		getProducts().then((products) => {
			this.setState({ products });
		});
	}

	render() {
		const { products } = this.state;
		return (
			<div className=" container">

			<div id="outer">
			<div id="filter">
			<table class="table table-bordered">


				<tbody>
					<tr>
						<td style={{ width: "20%" }}>  <input type="text" size="10" name="search" onChange={this.handleInputChange} value={this.state.search} /></td>

						<td style={{ width: "16%" }}>
						<div className="form-check">
							<label>
								<input
									type="radio"
									name="packaging"
									value="a"
									checked={this.state.packaging === 'a'}
									onChange={this.handlePackagingChange}
									className="form-check-input"
								/>
All 
</label>
						</div>
						<div className="form-check">
							<label>
								<input
									type="radio"
									name="packaging"
									value="Unpackaged"
									checked={this.state.packaging=== 'Unpackaged'}
									onChange={this.handlePackagingChange}
									className="form-check-input"
								/>
Unpackaged
</label>
						</div>
							<div className="form-check">
								<label>
									<input
										type="radio"
										name="packaging"
										value="Packaged"
										checked={this.state.packaging === 'Packaged'}
									onChange={this.handlePackagingChange}
										className="form-check-input"
									/>
Packaged/Pre-cut
</label>
							</div>

						</td>
						<td style={{ width: "16%" }}>
						<div className="form-check">
							<label>
								<input
									type="radio"
									name="originlocation"
									value="o"
									checked={this.state.originlocation === 'o'}
									onChange={this.handleLocationChange}
									className="form-check-input"
								/>
All
</label>
						</div>
						<div className="form-check">
							<label>
								<input
									type="radio"
									name="originlocation"
									value="Local"
									checked={this.state.originlocation === 'Local'}
									onChange={this.handleLocationChange}
									className="form-check-input"
								/>
Local
</label>
						</div>
							<div className="form-check">
								<label>
									<input
										type="radio"
										name="originlocation"
										value="Imported"
										checked={this.state.originlocation === 'Imported'}
									onChange={this.handleLocationChange}
										className="form-check-input"
									/>
Imported
</label>
							</div>

						</td>


						<td style={{ width: "34%", height: "10px" }}>   <InputRange
						draggableTrack
						maxValue={5000}
						minValue={0}
						formatLabel={value => `RS ${value}.00`}
						value={this.state.value}
						onChange={value => this.setState({ value: value })}
						 /></td>
						<td style={{ width: "7%" }}> <button type="button" onClick={this.searchFunction}>Search</button> </td>
						<td style={{ width: "7%" }}> <button type="button" onClick={this.reload}>Reload</button> </td>
					</tr>

				</tbody>
			</table>


















		</div>

		


			</div>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
				<div className="row">
					{

						products.map((product, index) => <ProductItem product={product} key={index} />)
					}</div>
				<hr />
				<Link to="/cart"><button className="btn btn-primary float-right" style={{ marginRight: "10px" }}>View Cart</button></Link>
				<br /><br /><br />
			</div>
		);
	}
}
