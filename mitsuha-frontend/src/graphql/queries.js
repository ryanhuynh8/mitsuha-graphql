import gql from 'graphql-tag';

export const getIssuesQuery = gql`{
    issues {
        title,
        status,
        description,
        updated,
        created
    }
}`;