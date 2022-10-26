import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './components/Index.js';
import Tables from './components/Tables.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

import './static/style.css';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			token: localStorage.getItem('token'),
		}
		this.Login = this.Login.bind(this)
		this.Logout = this.Logout.bind(this)
	}
	Login(token) {
		localStorage.setItem('token', token)
		this.setState({ token: localStorage.getItem('token') })
	}
	Logout() {
		localStorage.removeItem('token')
		this.setState({ token: localStorage.getItem('token') })
	}
	render() {
		return (
			<BrowserRouter>
				{
					this.state.token ?
					<Routes>
						<Route path="/" element={<Index token={this.state.token} Logout={this.Logout} />}>
							<Route index element={<Tables />} />
							<Route path="*" element={<Tables />} />
						</Route>
					</Routes> :
					<Routes>
						<Route path="/" element={<Index token={this.state.token} Logout={this.Logout} />}>
							<Route index element={<Login Login={token => {this.Login(token)}} />} />
							<Route path="register/" element={<Register Login={token => {this.Login(token)}} />} />
							<Route path="*" element={<Login Login={token => {this.Login(token)}} />} />
						</Route>
					</Routes>
				}
			</BrowserRouter>
		)
	}
}

export default App;