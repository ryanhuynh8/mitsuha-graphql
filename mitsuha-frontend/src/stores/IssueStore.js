import {observable, autorun, action} from 'mobx';
import {getIssuesQuery} from "../graphql/queries";
import client from '../graphql';

export default class IssueStore {
    @observable currentIssues = [];
    @observable currentOffset = 0;
    @observable limit = 6;

    @action
    fetchMyIssues = async () => {
        const response = await client.query({ query: getIssuesQuery, variables: { limit: this.limit, offset: this.currentOffset }});
        const data = response.data;
        data.issues.forEach(item => {
            this.currentIssues.push(item);
        });
        this.currentOffset += this.limit;
        console.log('');
    }
}