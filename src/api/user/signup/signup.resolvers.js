const createUser = require('../../../services/user/createUser.js');

const resolvers = {
    Query: {
        dummy: () => console.log('test'),
    },
    Mutation: {
        signupUser: async (_, args) => {
            const { userId, password, name, phoneNumber, group, registerDate } = args.input;
            const { success, error } = await createUser({
                userId,
                password,
                name,
                phoneNumber,
                group,
                registerDate,
            });

            if (!success) {
                return { success, error };
            }

            return { success };
        },
    },
};

module.exports = resolvers;
