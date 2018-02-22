import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Dashboard from './containers/Dashboard';
import Kanban from './containers/Kanban';
import Board from './components/Board';
import store from './stores';


class App extends Component {
    render() {
        console.log(store);
        return (
            <div className="App">
                <Route exact path="/" render={(routeProps) => (<Dashboard {...routeProps} store={store} />)}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/kanban" component={Kanban}/>
            </div>
        );
    }
}

export default App;
