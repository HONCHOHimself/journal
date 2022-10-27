import React from 'react';

import axios from 'axios';

import Profit from './Profit.js'
import Loss from './Loss.js'

import './static/table.css';

import Dollar from './static/currency-dollar.svg';
import Cash from './static/cash-stack.svg';

class Days extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			month_profit: 0
		}
		this.updateMonthProfit = this.updateMonthProfit.bind(this)
	}
	updateMonthProfit() {
		var profit = 0;
		setTimeout(() => {
			axios.get('https://my-journals-server.herokuapp.com/get-days/' + this.props.journal.id + '/').then(res => {
				for (let days in res.data) {
					profit += res.data[days].profit - res.data[days].loss
				}
				this.setState({ month_profit: profit })
			})
		}, 1000)
	}
	componentDidMount() {
		var profit = 0;
		setTimeout(() => {
			axios.get('https://my-journals-server.herokuapp.com/get-days/' + this.props.journal.id + '/').then(res => {
				for (let days in res.data) {
					profit += res.data[days].profit - res.data[days].loss
				}
				this.setState({ month_profit: profit })
			})
		}, 1000)
	}
	render() {
		return (
			<>
				{
					this.props.days.map(day => {

						return (
							<>
								<tbody>
									<tr>
										{
											day.day < 10 ?
											<th>/0{day.day}</th> :
											<th>/{day.day}</th>
										}
										<Profit day={day} month={this.props.month} updateMonthProfit={this.updateMonthProfit} />
										<Loss day={day} month={this.props.month} updateMonthProfit={this.updateMonthProfit} />
									</tr>
								</tbody>
							</>
						)
					})
				}
				<tfoot>
					<tr>
						<th colspan="1" style={{ borderBottom: '0', borderBottomLeftRadius: '7px' }}>
							<img src={Cash} alt="Cash" /> Profit:
						</th>
						<td colspan="2" style={{ borderBottom: '0', borderBottomRightRadius: '7px', textAlign: 'center' }}><img src={Dollar} alt="Dollar" />{this.state.month_profit}</td>
					</tr>
				</tfoot>
			</>
		)
	}
}

export default Days;