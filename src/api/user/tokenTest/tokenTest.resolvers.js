const { AuthenticationError } = require('apollo-server');

const resolvers = {
    Query: {
        tokenTest: (_, args, { user }) => {
            if (!user) throw new AuthenticationError('not authenticated');
            return { success: true, message: '성공', data: user };
        },
    },
};

module.exports = resolvers;
