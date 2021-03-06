const { ApolloServer } = require('apollo-server');

const schema = require('./graphql/mergeSchema');
const formatError = require('./graphql/formatError');
const context = require('./graphql/context');
const dbConnect = require('./model/dbConnect');

const server = new ApolloServer({
    schema,
    formatError,
    context,
});

dbConnect(process.env.DB)
    .then(() => console.log(`๐  ${process.env.DB} is ready`))
    .catch((err) => console.log(`๐งจ  ${process.env.DB} error`, err.console));

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`๐  Server ready at ${url}`);
});
