import React from 'react';

import axios from 'axios';

import './static/table.css';

import Dollar from './static/currency-dollar.svg';
import Pen from './static/pen-fill.svg';

const date = new Date()

class Loss extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			edit_mode: false,
			loss: this.props.day.loss,
		}
		this.editMode = this.editMode.bind(this)
		this.changeInput = this.changeInput.bind(this)
		this.submitLoss = this.submitLoss.bind(this)
	}
	editMode() {
		this.setState({ edit_mode: true })
	}
	changeInput(e) {
		if (e.target.name === 'loss') {
			this.setState({ loss: e.target.value })
		}
	}
	submitLoss(e) {
		e.preventDefault()
		const FormData = require('form-data');
		const form = new FormData();
		form.append('loss', this.state.loss)
		axios.post('https://my-journals-server.herokuapp.com/update-day-loss/' + this.props.day.id + '/', form).then(res => {
			if (res.data === true) {
				this.setState({ edit_mode: false })
				this.props.updateMonthProfit()
			}
		})
	}
	render() {
		return (
			this.props.day.day === date.getDate() && this.props.month === date.getMonth()+1 ?
			<td onClick={this.editMode}>
				{
					this.state.edit_mode ?
					<>
						<img src={Dollar} alt="Dollar" />
						<form onSubmit={this.submitLoss} method="POST">
							<input type="number" onChange={e => {this.changeInput(e)}} name="loss" value={this.state.loss} placeholder={this.state.loss} />
						</form>
					</> :
					<>
						<img src={Dollar} alt="Dollar" />{this.state.loss}<img style={{ width: '0.95em', position: 'absolute', marginTop: '4px', marginLeft: '15px' }} src={Pen} alt="Pen" />
					</>
				}
			</td>:
			<td>
				<img src={Dollar} alt="Dollar" />{this.state.loss}
			</td>
		)
	}
}

export default Loss;