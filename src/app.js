const { ApolloServer } = require('apollo-server');

const schema = require('./graphql/mergeSchema');
const formatError = require('./graphql/formatError');
const jwt = require('./modules/jwt');
/**
 * TODO 토큰
 */
const server = new ApolloServer({
    schema,
    formatError,
    context: async ({ req }) => {
        if (!req.headers.authorization) return { user: undefined };

        const user = await jwt.verify(req.headers.authorization);
        return { user };
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
