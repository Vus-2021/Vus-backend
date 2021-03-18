const jwt = require('../../../modules/jwt');
const signin = require('../../../services/user/signinUser');

const resolvers = {
    Mutation: {
        signin: async (_, args) => {
            const { userId, password } = args;
            const { success, user, message } = await signin({ userId, password });
            if (!success) {
                return { success, message };
            }
            const payload = { userId: user.partitionKey, name: user.name, type: user.type };
            const token = await jwt.sign(payload);
            return { success, message, data: token };
        },
    },
};

module.exports = resolvers;
