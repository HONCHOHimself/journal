import React from 'react';

import axios from 'axios';

import Days from './Days.js';

import './static/table.css';

import Calendar from './static/calendar.svg';

class Table extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			days: []
		}
	}
	componentDidMount() {
		axios.get('https://my-journals-server.herokuapp.com/add-journal-day/' + localStorage.getItem('token') + '/' + this.props.journal.id + '/')
		setTimeout(() => {
			axios.get('http://localhost:8000/get-days/' + this.props.journal.id + '/').then(res => {
				this.setState({ days: res.data })
			})
		}, 1000)
	}
	render() {
		return (
			<table className="table table-dark">
				<thead>
					<tr>
						<th style={{ borderTopLeftRadius: '7px' }}>
							<img src={Calendar} alt="Calendar" /> {this.props.journal.year}/{this.props.journal.month}
						</th>
						<th>Profit</th>
						<th style={{ borderTopRightRadius: '7px' }}>Loss</th>
					</tr>
				</thead>
				<Days days={this.state.days} month={this.props.journal.month} journal={this.props.journal} />
			</table>
		)
	}
}

export default Table;