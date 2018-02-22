import React, {Component} from 'react';
import {Icon, Card, Button, ButtonGroup, AnchorButton} from '@blueprintjs/core';
import {observer} from "mobx-react";
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';
import MyIssue from '../components/MyIssue';
import Sidebar from '../components/Sidebar';
import Board from '../components/Board';

const jake = {
    id: '1',
    name: 'Jake',
    url: 'http://adventuretime.wikia.com/wiki/Jake',
    avatarUrl: 'https://68.media.tumblr.com/avatar_1f7bdbbeb59c_128.png',
};

const BMO = {
    id: '2',
    name: 'BMO',
    url: 'http://adventuretime.wikia.com/wiki/BMO',
    avatarUrl: 'https://68.media.tumblr.com/avatar_1a34fe6de498_128.png',
};

const finn = {
    id: '3',
    name: 'Finn',
    url: 'http://adventuretime.wikia.com/wiki/Finn',
    avatarUrl: 'https://68.media.tumblr.com/avatar_09404f3287c6_128.png',
};

const princess = {
    id: '4',
    name: 'Princess bubblegum',
    url: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
    avatarUrl: 'https://68.media.tumblr.com/avatar_ec98529441c4_128.png',
};

export const authors = [
    jake, BMO, finn, princess,
];

export const quotes = [
    {
        id: '1',
        content: 'Sometimes life is scary and dark',
        author: BMO,
    },
    {
        id: '2',
        content: 'Sucking at something is the first step towards being sorta good at something.',
        author: jake,
    },
    {
        id: '3',
        content: 'You got to focus on what\'s real, man',
        author: jake,
    },
    {
        id: '4',
        content: 'Is that where creativity comes from? From sad biz?',
        author: finn,
    },
    {
        id: '5',
        content: 'Homies help homies. Always',
        author: finn,
    },
    {
        id: '6',
        content: 'Responsibility demands sacrifice',
        author: princess,
    },
    {
        id: '7',
        content: 'That\'s it! The answer was so simple, I was too smart to see it!',
        author: princess,
    },
    {
        id: '8',
        content: 'People make mistakes. It’s a part of growing up',
        author: finn,
    },
    {
        id: '9',
        content: 'Don\'t you always call sweatpants \'give up on life pants,\' Jake?',
        author: finn,
    },
    {
        id: '10',
        content: 'I should not have drunk that much tea!',
        author: princess,
    },
    {
        id: '11',
        content: 'Please! I need the real you!',
        author: princess,
    },
    {
        id: '12',
        content: 'Haven\'t slept for a solid 83 hours, but, yeah, I\'m good.',
        author: princess,
    },
];

const getByAuthor = (author, items) =>
    items.filter((quote) => quote.author === author);

export const authorQuoteMap =
    authors.reduce((previous, author) => ({
        ...previous,
        [author.name]: getByAuthor(author, quotes),
    }), {});

@observer
export default class Kanban extends Component {


    render() {
        return (
            <div className="wrapper">
                <Sidebar/>

                <div className="container-fluid kaizen-container">
                    <nav className="pt-navbar pt-dark kaizen-navbar">
                        <div className="pt-navbar-group pt-align-left">
                            <div className="pt-navbar-heading">Kaizen</div>
                            <input className="pt-input" placeholder="Search issue..." type="text"/>
                        </div>
                        <div className="pt-navbar-group pt-align-right">
                            <button className="pt-button pt-minimal pt-icon-home">Home</button>
                            <button className="pt-button pt-minimal pt-icon-document">My open issues</button>
                            <span className="pt-navbar-divider"/>
                            <button className="pt-button pt-minimal pt-icon-user"/>
                            <button className="pt-button pt-minimal pt-icon-notifications"/>
                            <button className="pt-button pt-minimal pt-icon-cog"/>
                        </div>
                    </nav>


                    <div className="content row">
                        <div className="col-md-12"><h1>Filter</h1></div>
                        <Board initial={authorQuoteMap}/>
                    </div>
                </div>
            </div>
        )
    }
}