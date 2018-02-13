import React, { Component } from 'react';
import {observer} from "mobx-react/index";
import { Suggest } from "@blueprintjs/select";
import ReactMarkdown from 'react-markdown';

const UserSuggest = Suggest.ofType({});

@observer
class MyIssue extends Component {
    componentDidMount() {

    }

    render() {
        const { data } = this.props;
        console.log();
        return (
            <div className="kaizen-issue py-2">
                <div className="row">
                    <div className="col-md-3 pt-1">
                        <div className="row">
                            <span><h3><a href="/">JIRA-1337</a></h3></span>
                        </div>
                        <div className="row">
                            <span className="kaizen-status">Active</span>
                            <div className="kaizen-flex kaizen-flex-v-centered">
                                <i className="fas fa-bug kaizen-bug" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <span><h2>{ data.title }</h2></span>
                        </div>
                        <div className="row overview-text">
                            <span>Assignee: <a href="/">Ryan Huynh</a></span>
                            <span>Reporter: <a href="/">Ryan Huynh</a></span>
                            <span>Project: <a href="/">Kaizen</a></span>
                            <span>Estimation: 3hr(s)</span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-3">
                        <div className="row">
                            <span className="kaizen-issue-label">Priority</span>
                        </div>
                        <div className="row">
                            <span className="kaizen-status-text"><i className="fas fa-circle kaizen-status-immediate" />4 - Fix If Time</span>
                        </div>

                        <div className="row pt-3">
                            <span className="kaizen-issue-label">Release Notes</span>
                        </div>
                        <div className="row">
                            <span className="kaizen-status-text"><a href="/" className="dotted">Add release notes</a></span>
                        </div>

                        <div className="row pt-3">
                            <span className="kaizen-status-text"><i className="fas fa-eye" /><a href="/" className="dotted">Subscribe</a></span>
                        </div>

                        <div className="row pt-3">
                            <span className="kaizen-issue-label">Add another subscriber</span>
                        </div>
                        <div className="row">
                            <UserSuggest items={[]} itemRenderer={() => <span>foo</span>} itemPredicate={() => true} />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row py-1 pt-3"><span className="kaizen-issue-bold-label">Opened by Ryan Huynh</span></div>
                        <div className="row"><span className="kaizen-issue-label">01/31/2018 1:48 PM</span></div>

                        <div className="row py-1 pt-3"><span className="kaizen-issue-bold-label">Assigned to Ryan Huynh by himself</span></div>
                        <div className="row"><span className="kaizen-issue-label">01/31/2018 1:48 PM</span></div>

                        <div className="row kaizen-issue-body pt-3">
                            <ReactMarkdown source={data.description} />
                        </div>

                        <div className="row py-1 pt-3"><span
                            className="kaizen-issue-bold-label">Ryan Huynh on 11/1/2011</span></div>
                        <div className="row kaizen-issue-body pt-3">
                            I think this is funny as fuck
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default MyIssue;