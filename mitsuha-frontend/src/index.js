import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import './index.css';
import App from './App';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
    routing: routingStore,
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
    <Provider>
        <Router history={history}>
            <div>
                <App />
            </div>
        </Router>
</Provider>, document.getElementById('root'));

