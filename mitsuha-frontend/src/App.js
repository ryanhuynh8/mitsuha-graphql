import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Dashboard from './containers/Dashboard';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import store from './stores';


class App extends Component {
    render() {
        console.log(store);
        return (
            <div className="App">
                <Route exact path="/" render={(routeProps) => (<Dashboard {...routeProps} store={store} />)}/>
                <Route path="/dashboard" component={Dashboard}/>
            </div>
        );
    }
}

export default App;
