const { query } = require('../../../../services');

const resolvers = {
    Query: {
        getUsers: async (parent, args, { user }) => {
            if (!user || user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            const { userId, name, type } = {
                userId: args.userId,
                name: args.name,
                type: args.type,
            };

            const params = {
                sortKey: ['#user', 'eq'],
                index: ['sk-index', 'using'],
            };

            const filterExpression = {
                name: [name, 'eq'],
                type: [type, 'eq'],
                partitionKey: [userId, 'eq'],
            };

            try {
                const { success, message, code, data } = await query({
                    params,
                    filterExpression,
                });
                data.forEach((user) => {
                    user.registerDate = user.gsiSortKey.split('#')[2];
                    user.userId = user.partitionKey;
                });

                return { success, message, code, data };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
