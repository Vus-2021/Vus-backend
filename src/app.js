const { ApolloServer } = require('apollo-server');

const schema = require('./graphql/mergeSchema');
const formatError = require('./graphql/formatError');
const context = require('./graphql/context');
/**
 * TODO 토큰
 */
const server = new ApolloServer({
    schema,
    formatError,
    context,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
