import React from 'react';

import axios from 'axios';

import Table from './Table.js';

import './static/table.css';

class Tables extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			journals: []
		}
	}
	componentDidMount() {
		axios.get('https://my-journals-server.herokuapp.com/add-journal/' + localStorage.getItem('token') + '/')
		setTimeout(() => {
			axios.get('https://my-journals-server.herokuapp.com/get-journals/' + localStorage.getItem('token') + '/').then(res => {
				this.setState({ journals: res.data })
			})
		}, 1000)
	}
	render() {
		return (
			<section>
				{
					this.state.journals.map(journal => {
						return (
							<Table journal={journal} />
						)
					})
				}
			</section>
		)
	}
}

export default Tables;