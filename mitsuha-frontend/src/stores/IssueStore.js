import {observable, autorun, action} from 'mobx';
import {getIssuesQuery} from "../graphql/queries";
import client from '../graphql';

export default class IssueStore {
    @observable currentIssues = [];

    @action
    fetchMyIssues = async () => {
        const response = await client.query({ query: getIssuesQuery });
        const data = response.data;
        this.currentIssues = data.issues;
    }
}