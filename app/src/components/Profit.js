import React from 'react';

import axios from 'axios';

import './static/table.css';

import Dollar from './static/currency-dollar.svg';
import Pen from './static/pen-fill.svg';

const date = new Date()

class Profit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			edit_mode: false,
			profit: this.props.day.profit,
		}
		this.editMode = this.editMode.bind(this)
		this.changeInput = this.changeInput.bind(this)
		this.submitProfit = this.submitProfit.bind(this)
	}
	editMode() {
		this.setState({ edit_mode: true })
	}
	changeInput(e) {
		if (e.target.name === 'profit') {
			this.setState({ profit: e.target.value })
		}
	}
	submitProfit(e) {
		e.preventDefault()
		const FormData = require('form-data');
		const form = new FormData();
		form.append('profit', this.state.profit)
		axios.post('http://localhost:8000/update-day-profit/' + this.props.day.id + '/', form).then(res => {
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
						<form onSubmit={this.submitProfit} method="POST">
							<input type="number" onChange={e => {this.changeInput(e)}} name="profit" value={this.state.profit} placeholder={this.state.profit} />
						</form>
					</> :
					<>
						<img src={Dollar} alt="Dollar" />{this.state.profit}<img style={{ width: '0.95em', position: 'absolute', marginTop: '4px', marginLeft: '15px' }} src={Pen} alt="Pen" />
					</>
				}
			</td> :
			<td>
				<img src={Dollar} alt="Dollar" />{this.state.profit}
			</td>
		)
	}
}

export default Profit;