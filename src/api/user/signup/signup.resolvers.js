const createUser = require('../../../services/user/createUser.js');

const resolvers = {
    Query: {
        dummy: () => console.log('test'),
    },
    Mutation: {
        signupUser: async (_, args) => {
            const { userId, password, name, phoneNumber, type, registerDate } = args.input;
            const { success, message } = await createUser({
                userId,
                password,
                name,
                phoneNumber,
                type,
                registerDate,
            });

            if (!success) {
                return { success, message };
            }

            return { success, message };
        },
    },
};

module.exports = resolvers;
