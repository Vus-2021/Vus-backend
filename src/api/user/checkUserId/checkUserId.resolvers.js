const { getUserById } = require('../../../services/user');

const resolvers = {
    Query: {
        checkUserId: async (_, args) => {
            try {
                const { userId } = args;
                const { success: alreadyUserId } = await getUserById({ userId });

                if (alreadyUserId) {
                    return { success: false, message: 'alreadyUserId' };
                }

                return { success: true, message: 'Available user id' };
            } catch (error) {
                return { success: true, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
