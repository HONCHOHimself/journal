import React from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import './static/auth.css';

import User from './static/person-circle.svg';
import Username from './static/person-fill.svg';
import Password from './static/lock-fill.svg';

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false,
			username: '',
			password: '',
		}
		this.changeInput = this.changeInput.bind(this)
		this.submit = this.submit.bind(this)
	}
	changeInput(e) {
		if (e.target.name === 'username') {
			this.setState({ username: e.target.value, error: false })
		} else if (e.target.name === 'password') {
			this.setState({ password: e.target.value, error: false })
		}
	}
	submit(e) {
		e.preventDefault()
		const FormData = require('form-data');
		const form = new FormData();
		form.append('username', this.state.username)
		form.append('password', this.state.password)
		axios.post('http://localhost:8000/auth/login/', form).then(res => {
			if (res.data === false) {
				this.setState({ error: true })
			} else {
				setTimeout(() => {
					this.props.Login(res.data)
				}, 500)
			}
		})
	}
	render() {
		return (
			<form onSubmit={this.submit} className="auth" method="POST">
				<section>
					<img src={User} alt="User" />
					<span>
						<h1>Login</h1>
						{
							this.state.error ?
							<small className="text-danger" style={{ marginLeft: '10px' }}>Invalid Credential.</small> :
							null
						}
					</span>
				</section>
				<div className="input">
					<label for="username"><img for="username" src={Username} alt="Username" /></label>
					<input id="username" onChange={e => {this.changeInput(e)}} name="username" value={this.state.username} type="username" placeholder="Username" minLength="4" maxLength="14" required />
				</div>
				<div className="input">
					<label for="password"><img src={Password} alt="Password" /></label>
					<input id="password" onChange={e => {this.changeInput(e)}} name="password" value={this.state.password} type="password" placeholder="Password" minLength="8" maxLength="16" required />
				</div>
				<button type="submit">Login</button>
				<hr />
				<p>Need a new account? <Link className="link" to="/register/">Register</Link></p>
			</form>
		)
	}
}

export default Login;