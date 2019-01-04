import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { observer, Provider } from 'mobx-react';
import { Alert } from 'react-bootstrap';
import store from '../stores';
import styles from './app.less';
import Index from './index';
import locale from './App.locale';

@observer
class App extends Component {
	constructor(props) {
		super(props);
		const { AppState } = store;
		AppState.requestConfig();
	}

	render() {
		
		if (!store.AppState.config) {
			return <Alert bsStyle="warning" 
			className={styles.loading}>loading...</Alert>;
		}
		return <Provider store={store}>
			<Router ref={store.AppState.initRouter}>
				<div className={styles.app}>
					{
						store.AppState.requesting 
							? <Alert bsStyle="warning" 
								className={styles.loading}>loading...</Alert> 
							: null
					}
					
					{/*主体*/}
					<div 
						className={styles.right} 
						style={{display: 'table-cell\0'}}> {/*这里的内联样式是为了避免webpack编译less出错*/}
						
						<div className={styles.main}>
							<Switch>
								<Route exact path="/" component={Index}/>
								<Route path="/index" component={Index}/>
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		</Provider>
	}
} 

export default App;