const { gql } = require('apollo-server');
const typeDefs = gql`
    scalar Upload

    type Query {
        uploads: [File]
    }

    type File {
        filename: String
        mimetype: String
        encoding: String
        url: String
    }

    type Mutation {
        singleUpload(file: Upload!): File!
    }
`;

module.exports = typeDefs;
