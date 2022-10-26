import React from 'react';

import { Outlet } from 'react-router-dom';

import './static/index.css';

import Logout from './static/box-arrow-in-left.svg';

class Index extends React.Component {
	render() {
		return (
			<main>

				<Outlet />

				{
					this.props.token ?
					<img src={Logout} style={{
						width: '1.8em',
						position: 'fixed',
						bottom: '0',
						margin: '10px 1px',
						zIndex: '1',
						border: '0',
					}} onClick={this.props.Logout} alt="Logout" /> :
					null
				}

			</main>
		)
	}
}

export default Index;