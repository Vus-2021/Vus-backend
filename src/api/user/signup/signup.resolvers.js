const createUser = require('../../../services/user/createUser.js');

const resolvers = {
    Query: {
        dummy: () => console.log('test'),
    },
    Mutation: {
        signupUser: async (_, args) => {
            const { userId, password, name, phoneNumber, group, registerDate } = args.input;
            const { result, error } = await createUser({
                userId,
                password,
                name,
                phoneNumber,
                group,
                registerDate,
            });

            if (result === 'fail') {
                return { result, error };
            }

            return { result };
        },
    },
};

module.exports = resolvers;
