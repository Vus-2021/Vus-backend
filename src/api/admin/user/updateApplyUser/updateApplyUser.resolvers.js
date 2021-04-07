const updateApplyUser = require('../../../../services/user/updateApplyUser');

const resolvers = {
    Mutation: {
        updateApplyUser: async (parent, { userId, month, state }) => {
            try {
                const { success, message, code } = await updateApplyUser({
                    partitionKey: userId,
                    sortKey: `#applyRoute#${month}`,
                    state: state,
                });
                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
