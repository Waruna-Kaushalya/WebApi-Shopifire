import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function getProducts() {
	console.log("test grt products")
	return axios.get(`${BASE_URL}/api/products`)
		.then(response => response.data);
}

export function getCartProducts(cart) {
	console.log("test cart products")
	return axios.post(`${BASE_URL}/api/products`, {cart})
		.then(response => response.data);
}

export function login (data) {
	return axios.post(`${BASE_URL}/api/auth/login`, { email: data.name, password: data.password })
		.then(response =>response)
		.catch(err => console.log(err.response.data.errors));
}

export function adminLog (data) {
	return axios.post(`${BASE_URL}/api/auth/adminLog`, { email: data.name, password: data.password })
		.then(response =>response)
		.catch(err => console.log(err.response.data.errors));
}

export function storeCart (userid,objectarray) {
	return axios.post(`${BASE_URL}/api/storeCart`, { id: userid, cart: objectarray })
		.then(response =>response)
		.catch(err => console.log("err.response.data.errors"));
}

//	return axios.post(`${BASE_URL}/api/auth/Register`, { name: data.name, password: data.password,email:data.email,rpassword:data.rpassword })
export function register(data) {

	return axios.post(`${BASE_URL}/api/auth/Register`, { name: data.name, password: data.password,rpassword:data.rpassword,email:data.email })
		.then(response=> response).catch(err => console.log(err.response.data.errors));
}

export function EditUserDetails(data) {
	var x=localStorage.getItem("userObject980")
	var x = JSON.parse(x)
	console.log("From repo")
	console.log(x.name)
	console.log(x._id)

	return axios.post(`${BASE_URL}/api/EditUserDetails`, { name: data.name,email:data.email,id:x._id })
		.then(response=> response).catch(err => console.log("Block 1.11"));
}
export function Editpassword(data) {
	var x=localStorage.getItem("userObject980")
	var x = JSON.parse(x)
	console.log("From repo")
	console.log(data.oldpassword)
	console.log(data.npassword)
	console.log(data.rnpassword)


	 return axios.post(`${BASE_URL}/api/EditPassword`, { op: data.oldpassword,np:data.npassword,rnp:data.rnpassword,id:x._id })
	 	.then(response=> response).catch(err => console.log("Block 1.11"));
}

export function searchFunction1 (searchvalue,packaging,location,minvalue,maxvalue) {//
	var testname1="surainsearch"
	return axios.get(`${BASE_URL}/api/test`, {
		params: {
		  Searchvalue:searchvalue,
		  Packaging:packaging,
		  Location:location,
		  Minvalue:minvalue,
		  Maxvalue:maxvalue
		}
	  })
		.then(response =>response.data)
		.catch(err => console.log(err.response.data.errors));
}


