import React, {Component} from 'react';
import {observer} from "mobx-react/index";
import {Icon, Card, Button, ButtonGroup, AnchorButton} from '@blueprintjs/core';

@observer
export default class Sidebar extends Component {
    render() {
        return <nav id="sidebar">

            <div className="sidebar-header">
                <h3>Kaizen</h3>
            </div>

            <ul className="list-unstyled components">
                <li className="active"><a href="#">Filters</a></li>
                <li><a href="#"><Icon iconName="bookmark" iconSize="inherit"/> Favorites</a></li>
                <li><a href="#"><Icon iconName="history" iconSize="inherit"/> Recent</a></li>
                <li><a href="#"><Icon iconName="box" iconSize="inherit"/> Planner</a></li>
                <li><a href="#"><Icon iconName="document" iconSize="inherit"/> Wiki</a></li>
                <li><a href="#"><Icon iconName="time" iconSize="inherit"/> Time Tracking</a></li>
            </ul>
        </nav>
    }
}