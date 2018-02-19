import {observable, autorun, action} from 'mobx';
import {getIssuesQuery, getSingleIssue, getComments, updateSingleIssue} from "../graphql/queries";
import client from '../graphql';

export default class IssueStore {
    @observable currentIssues = [];
    @observable currentOffset = 0;
    @observable limit = 6;
    @observable activeIssue = {};
    @observable activeComments = [];
    @observable editing = false;

    @action
    fetchMyIssues = async (projectId) => {
        const response = await client.query({ query: getIssuesQuery, variables: { projectId, limit: this.limit, offset: this.currentOffset }});
        const data = response.data;
        data.issues.forEach(item => {
            this.currentIssues.push(item);
        });
        this.currentOffset += this.limit;
    };

    @action
    fetchSingleIssue = async (id) => {
        const response = await client.query({ query: getSingleIssue, variables: { id: id }});
        const data = response.data;
        this.activeIssue = data.issue;
    };

    @action
    fetchComments = async (id) => {
        const response = await client.query({query: getComments, variables: {id: id}});
        this.activeComments = response.data.comments;
    };

    @action
    updateIssue = async (id, title, content) => {
        const response = await client.mutate({ mutation: updateSingleIssue, variables: { id, title, content }});
        return response;
    };

    @action
    toggleEditingMode = () => {
        this.editing = !this.editing;
    };
}