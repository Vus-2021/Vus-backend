const { ApolloServer } = require('apollo-server');

const schema = require('./graphql/index.js');
const formatError = require('./graphql/formatError');

const server = new ApolloServer({ schema, formatError });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
