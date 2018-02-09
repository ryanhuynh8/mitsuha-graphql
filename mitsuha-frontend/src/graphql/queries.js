import gql from 'graphql-tag';

export const getIssuesQuery = gql`
    query getIssues($offset: Int, $limit: Int) {
        issues(offset: $offset, limit: $limit) {
            id,
            title,
            status,
            description,
            updated,
            created
        }
    }
`;

export const getSingleIssue = gql`
    query getIssue($id: Int) {
        issue(id: $id) {
            id
            title
            status
            description
            updated
            created
        }
    }  
`;