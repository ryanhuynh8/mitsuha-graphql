import {observable, autorun, action} from 'mobx';
import {getIssuesQuery, getSingleIssue} from "../graphql/queries";
import client from '../graphql';

export default class IssueStore {
    @observable currentIssues = [];
    @observable currentOffset = 0;
    @observable limit = 6;
    @observable activeIssue = {};

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
    }
}