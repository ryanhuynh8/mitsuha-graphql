import React, { Component } from 'react';
import { Icon, Card, Button, ButtonGroup, AnchorButton } from '@blueprintjs/core';

class Dashboard extends Component {
    render() {
        return (
            <div className="wrapper">
                <nav id="sidebar">

                    <div className="sidebar-header">
                        <h3>Kaizen</h3>
                    </div>

                    <ul className="list-unstyled components">
                        <li className="active"><a href="#">Filters</a></li>
                        <li><a href="#"><Icon iconName="bookmark" iconSize="inherit" /> Favorites</a></li>
                        <li><a href="#"><Icon iconName="history" iconSize="inherit" /> Recent</a></li>
                        <li><a href="#"><Icon iconName="box" iconSize="inherit" /> Planner</a></li>
                        <li><a href="#"><Icon iconName="document" iconSize="inherit" /> Wiki</a></li>
                        <li><a href="#"><Icon iconName="time" iconSize="inherit" /> Time Tracking</a></li>
                    </ul>
                </nav>

                <div className="container-fluid kaizen-container">
                    <nav className="pt-navbar pt-dark kaizen-navbar">
                        <div className="pt-navbar-group pt-align-left">
                            <div className="pt-navbar-heading">Kaizen</div>
                            <input className="pt-input" placeholder="Search issue..." type="text" />
                        </div>
                        <div className="pt-navbar-group pt-align-right">
                            <button className="pt-button pt-minimal pt-icon-home">Home</button>
                            <button className="pt-button pt-minimal pt-icon-document">My open issues</button>
                            <span className="pt-navbar-divider" />
                            <button className="pt-button pt-minimal pt-icon-user" />
                            <button className="pt-button pt-minimal pt-icon-notifications" />
                            <button className="pt-button pt-minimal pt-icon-cog" />
                        </div>
                    </nav>

                    <br />
                    <div className="content row">
                        <div className="col-md-12"><h1>Filter</h1></div>
                        <div className="col-md-12">
                            <Card interactive={true} elevation={Card.ELEVATION_TWO}>
                                <h5><a href="#">Filter settings</a></h5>
                                <p>Card content</p>
                                <Button>Submit</Button>
                            </Card>
                        </div>

                        <div className="col-md-12 pt-1 py-2" />

                        <div className="col-md-12">Your current open cases</div>

                        <div className="col-md-12">
                            <table className="pt-table pt-striped pt-interactive kaizen-issues-table">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Issue type</th>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Reported by</th>
                                    <th>Assigned to</th>
                                    <th>Due</th>
                                    <th>Priority</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td width="5%"><input type="checkbox" /></td>
                                    <td width="8%"><i className="fas fa-bug kaizen-bug" /></td>
                                    <td width="5%">32132</td>
                                    <td width="40%">This is a bug</td>
                                    <td width="5%">Done</td>
                                    <td width="10%">Ryan Huynh</td>
                                    <td width="10%">Ryan Huynh</td>
                                    <td width="5%">10/05/1990</td>
                                    <td width="10%">1 - High</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-md-2 py-4 kaizen-buttons-group">
                            <ButtonGroup large={true}>
                                <button type="button" className="pt-button pt-large">
                                    <span className="kaizen-icon fas fa-reply" />
                                    Reply
                                </button>

                                <button type="button" className="pt-button pt-large">
                                    <span className="kaizen-icon fas fa-edit" />
                                    Edit
                                </button>

                                <button type="button" className="pt-button pt-large">
                                    <span className="kaizen-icon fas fa-users" />
                                    Assign
                                </button>

                                <button type="button" className="pt-button pt-large">
                                    <span className="kaizen-icon fas fa-check" />
                                    Resolve
                                </button>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Dashboard;