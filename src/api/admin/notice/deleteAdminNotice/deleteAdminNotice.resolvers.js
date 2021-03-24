const deleteNotice = require('../../../../services/notice/deleteNotice');

const resolvers = {
    Mutation: {
        deleteNotice: async (_, { partitionKey }, { user }) => {
            if (!user || user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            try {
                const sortKey = '#notice';
                const { success, message, code } = await deleteNotice({ partitionKey, sortKey });
                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
