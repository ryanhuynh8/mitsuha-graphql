import React, { Component } from 'react';
import {observer} from "mobx-react/index";
import { Suggest } from "@blueprintjs/select";
import ReactMarkdown from 'react-markdown';
import CKEditor from "react-ckeditor-component";
import { Icon, Card, Button, ButtonGroup, AnchorButton } from '@blueprintjs/core';

const UserSuggest = Suggest.ofType({});

@observer
class MyIssue extends Component {
    state = { updating: false, saveButtonLabel: 'Save' };

    updateIssue = async (id) => {
        this.setState({ updating: true, saveButtonLabel: 'Saving...'});
        const content = this.state.editor ? this.state.editor.getData() : this.props.data.description;
        const result = await this.props.store.issueStore.updateIssue(Number(this.props.data.id), this.state.newTitle, content);
        this.setState({ updating: false, saveButtonLabel: 'Save'});
    };

    updateContent = (e) => {
        this.setState({ editor: e.editor })
    };

    titleChange = (e) => {
        this.setState({ newTitle: e.target.value });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ newTitle: nextProps.data.title });
        
    }

    render() {
        const { data, comments } = this.props;
        const { saveButtonLabel, updating } = this.state;
        const { editing } = this.props.store.issueStore;

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
                            { !editing && <span><h2>{ data.title }</h2></span> }
                            { editing && <input className="pt-input pt-intent-primary kaizen-title-edit" type="text" value={this.state.newTitle} dir="auto" onChange={this.titleChange} />}
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

                            { editing && <div><CKEditor
                                activeClass="p10"
                                content={data.description}
                                events={{
                                    "change": this.updateContent
                                }}
                            />
                            <br />
                            <Button onClick={this.updateIssue} disabled={updating}>{ saveButtonLabel }</Button>
                            </div> }

                            { !editing && <div dangerouslySetInnerHTML={{__html: data.description }} /> }
                        </div>

                        {comments.length === 0 &&
                        <div>
                            <div className="row py-1 pt-3"><span
                                className="kaizen-issue-bold-label">Ryan Huynh on 11/1/2011</span></div>
                            <div className="row kaizen-issue-body pt-3">
                                Loading comments...
                            </div>
                        </div>
                        }

                        {comments.length > 0 && this.renderComments(comments)}
                    </div>


                </div>
            </div>
        )
    }

    renderComments(comments) {
        return comments.map(comment => (
            <div key={comment.id}>
                <div className="row py-1 pt-3"><span
                    className="kaizen-issue-bold-label">Ryan Huynh on {comment.createdAt}</span></div>
                <div className="row kaizen-issue-body pt-3">
                    {comment.comment}
                </div>
            </div>
        ))
    }
}

export default MyIssue;