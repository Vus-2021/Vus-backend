const deleteUsers = require('../../../../services/user/deleteUser');

const resolvers = {
    Mutation: {
        deleteUser: async (parent, args, { user }) => {
            if (!user || user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            const userList = args.userId.map((item) => {
                return {
                    partitionKey: item,
                    sortKey: '#user',
                };
            });
            try {
                const { success, message, code } = await deleteUsers({ userList });
                return { success, message, code };
            } catch (error) {
                return { success: false, message: 'Failed delete users', code: 500 };
            }
        },
    },
};

module.exports = resolvers;
