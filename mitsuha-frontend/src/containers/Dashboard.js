import React, { Component } from 'react';
import { Icon, Card, Button, ButtonGroup, AnchorButton } from '@blueprintjs/core';
import {observer} from "mobx-react";
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';
import MyIssue from '../components/MyIssue';

@observer
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: true };
    }
    async componentWillMount() {
        this.props.store.issueStore.fetchMyIssues(1);
    }

    loadMoreIssue = async () => {
        return this.props.store.issueStore.fetchMyIssues(1);
        console.log('haha');
    };

    selectIssue = (id) => {
        console.log('foo');
        this.setState({ isOpen: true });
        this.props.store.issueStore.fetchComments(Number(id));
        return this.props.store.issueStore.fetchSingleIssue(Number(id));
    };

    renderSlideTitle = (activeIssue) => {
        return (<div className="row">
            <div className="col-md-4"><h3>Issue detail</h3></div>
            <div className="col-md-5 offset-md-3">
                <button className="pt-button pt-minimal"><i className="fas fa-pencil-alt" />Edit</button>
                <button className="pt-button pt-minimal"><i className="fas fa-email" />Email</button>
                <button className="pt-button pt-minimal"><i className="fas fa-users" />Assign</button>
                <button className="pt-button pt-minimal"><i className="fas fa-check" />Resolve</button>
            </div>
        </div>)
    };

    render() {
        const { currentIssues, activeIssue } = this.props.store.issueStore;
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
                                    <th />
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

                                    {currentIssues.map(issue => (
                                        <tr key={issue.id} onClick={() => this.selectIssue(issue.id)}>
                                            <td width="5%"><label className="pt-control pt-checkbox">
                                                <input type="checkbox pt-large" />
                                                <span className="pt-control-indicator" />
                                            </label></td>
                                            <td width="8%"><i className="fas fa-bug kaizen-bug" /></td>
                                            <td width="5%">32132</td>
                                            <td width="40%">{issue.title}</td>
                                            <td width="5%">Done</td>
                                            <td width="10%">Ryan Huynh</td>
                                            <td width="10%">Ryan Huynh</td>
                                            <td width="5%">10/05/1990</td>
                                            <td width="10%">1 - High</td>
                                        </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="col-md-12 py-2">
                            <button type="button" className="pt-button pt-large kaizen-full-width" onClick={this.loadMoreIssue}>
                                <span className="kaizen-icon fas fa-sync" />
                                Load more
                            </button>
                            <button type="button" className="pt-button pt-large kaizen-full-width" onClick={() => this.setState({isOpen:true})}>
                                <span className="kaizen-icon fas fa-sync" />
                                Show/Hide
                            </button>
                        </div>

                        <div className="col-md-12 py-4 kaizen-buttons-group">
                            <ButtonGroup large={false}>
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

                        <div className="col-md-6 py-2">
                            <table className="pt-table pt-bordered kaizen-bordered-table">
                                <thead>
                                <tr>
                                    <th><h6>Cases matching this filter</h6></th>
                                    <th />
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Total</td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td>Cases without estimate</td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td>Total estimated time remaining</td>
                                    <td>0 hour(s)</td>
                                </tr>
                                <tr>
                                    <td>Total elapsed time</td>
                                    <td>0 hour(s)</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Slider
                        title={this.renderSlideTitle(activeIssue)}
                        footer={this.renderSlideTitle(activeIssue)}
                        isOpen={this.state.isOpen}
                        onOutsideClick={() => this.setState({isOpen: false})}>
                        <MyIssue data={activeIssue} />
                    </Slider>
                </div>
            </div>);
    }
}

export default Dashboard;