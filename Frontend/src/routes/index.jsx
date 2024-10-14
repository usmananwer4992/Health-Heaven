import React, { memo } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';
import PrivateRoutes from './PrivateRoutes';
import Auth from './Auth';
import Layout from '../Layout';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
// import { NotFound } from 'components/common';

function Routes() {
	return (
		<BrowserRouter history={history}>
			<Switch>
				
				<Route path="/app">
				<Layout>
					<PrivateRoutes />
					</Layout>
				</Route>
				<Route path="">
					<Auth />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default memo(Routes);
