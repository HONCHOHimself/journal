import React from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import './static/auth.css';

import User from './static/person-circle.svg';
import Username from './static/person-fill.svg';
import Password from './static/lock-fill.svg';

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false,
			username_error: false,
			username: '',
			password: '',
			confirm_password: '',
			mismatch_password: false,
		}
		this.changeInput = this.changeInput.bind(this)
		this.submit = this.submit.bind(this)
	}
	changeInput(e) {
		const FormData = require('form-data');
		const form = new FormData();
		if (e.target.name === 'username') {
			this.setState({ username: e.target.value, error: false })
			setTimeout(() => {
				form.append('username', this.state.username)
				axios.post('http://localhost:8000/form-validation/validate-username/', form).then(res => {
					if (res.data === true) {
						this.setState({ username_error: true })
					} else {
						this.setState({ username_error: false })
					}
				})
			}, 500)
		} else if (e.target.name === 'password') {
			this.setState({ password: e.target.value, error: false })
			if (this.state.confirm_password) {
				if (e.target.value !== this.state.confirm_password) {
					this.setState({ mismatch_password: true })
				} else {
					this.setState({ mismatch_password: false })
				}
			}
		} else if (e.target.name === 'confirm-password') {
			this.setState({ confirm_password: e.target.value, error: false })
			if (e.target.value !== this.state.password) {
				this.setState({ mismatch_password: true })
			} else {
				this.setState({ mismatch_password: false })
			}
		}
	}
	submit(e) {
		e.preventDefault()
		const FormData = require('form-data');
		const form = new FormData();
		form.append('username', this.state.username)
		form.append('password', this.state.password)
		axios.post('http://localhost:8000/auth/register/', form).then(res => {
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
						<h1>Create an Account</h1>
						{
							this.state.error ?
							<small className="text-danger" style={{ marginLeft: '10px' }}>User Already exists.</small> :
							null
						}
					</span>
				</section>
				{
					this.state.username_error ?
					<small className="text-danger">Username Already exists.</small> :
					null
				}
				{
					this.state.username_error ?
					<div className="input" style={{ border: '1px solid #E46A68' }}>
						<label for="username"><img for="username" src={Username} alt="Username" /></label>
						<input id="username" onChange={e => {this.changeInput(e)}} name="username" value={this.state.username} type="username" placeholder="Username" minLength="4" maxLength="14" required />
					</div> :
					<div className="input">
						<label for="username"><img for="username" src={Username} alt="Username" /></label>
						<input id="username" onChange={e => {this.changeInput(e)}} name="username" value={this.state.username} type="username" placeholder="Username" minLength="4" maxLength="14" required />
					</div>
				}
				<div className="input">
					<label for="password"><img src={Password} alt="Password" /></label>
					<input id="password" onChange={e => {this.changeInput(e)}} name="password" value={this.state.password} type="password" placeholder="Password" minLength="8" maxLength="16" required />
				</div>
				{
					this.state.mismatch_password ?
					<small className="text-danger">Passwords don't match.</small> :
					null
				}
				{
					this.state.mismatch_password ?
					<div className="input" style={{ border: '1px solid #E46A68' }}>
						<label for="confirm-password"><img src={Password} alt="Confirm Password" /></label>
						<input id="confirm-password" onChange={e => {this.changeInput(e)}} name="confirm-password" value={this.state.confirm_password} type="password" placeholder="Confirm Password" minLength="8" maxLength="16" required />
					</div> :
					<div className="input">
						<label for="confirm-password"><img src={Password} alt="Confirm Password" /></label>
						<input id="confirm-password" onChange={e => {this.changeInput(e)}} name="confirm-password" value={this.state.confirm_password} type="password" placeholder="Confirm Password" minLength="8" maxLength="16" required />
					</div>
				}
				{
					this.state.mismatch_password ?
					<button type="submit" disabled>Register</button> :
					<button type="submit">Register</button>
				}
				<hr />
				<p>Already have an account? <Link className="link" to="/">Login</Link></p>
			</form>
		)
	}
}

export default Register;