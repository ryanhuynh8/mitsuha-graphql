import React, { Component } from 'react';
import {observer} from "mobx-react/index";
import { Suggest } from "@blueprintjs/select";
import ReactMarkdown from 'react-markdown';

const UserSuggest = Suggest.ofType({});
const content = "\n" +
    "# Live demo\n" +
    "\n" +
    "Changes are automatically rendered as you type.\n" +
    "\n" +
    "* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)\n" +
    "* Renders actual, \"native\" React DOM elements\n" +
    "* Allows you to escape or skip HTML (try toggling the checkboxes above)\n" +
    "* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n" +
    "\n" +
    "## HTML block below\n" +
    "\n" +
    "<blockquote>\n" +
    "  This blockquote will change based on the HTML settings above.\n" +
    "</blockquote>\n" +
    "\n" +
    "## How about some code?\n" +
    "```js\n" +
    "var React = require('react');\n" +
    "var Markdown = require('react-markdown');\n" +
    "\n" +
    "React.render(\n" +
    "  <Markdown source=\"# Your markdown here\" />,\n" +
    "  document.getElementById('content')\n" +
    ");\n" +
    "```\n" +
    "\n" +
    "Pretty neat, eh?\n" +
    "\n" +
    "## Tables?\n" +
    "\n" +
    "| Feature | Support |\n" +
    "| ------ | ----------- |\n" +
    "| tables | ✔ |\n" +
    "| alignment | ✔ |\n" +
    "| wewt | ✔ |\n" +
    "\n" +
    "## More info?\n" +
    "\n" +
    "Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)\n" +
    "\n" +
    "---------------\n" +
    "\n" +
    "A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal\n";

@observer
class MyIssue extends Component {
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
                    </div>


                </div>
            </div>
        )
    }
}

export default MyIssue;