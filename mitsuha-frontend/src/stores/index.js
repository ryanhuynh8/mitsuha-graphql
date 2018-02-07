import IssueStore from "./IssueStore";

class Store {
    constructor() {
        this.issueStore = new IssueStore(this);
    }
}

export default new Store();