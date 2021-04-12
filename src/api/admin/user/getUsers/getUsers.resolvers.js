const { query } = require('../../../../services/dynamoose');
const queryBuild = require('../../../../modules/queryBuild');

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

            const condition = queryBuild({
                partitionKey: [userId, 'eq'],
                sortKey: ['#user', 'eq'],
                name: [name, 'eq'],
                type: [type, 'eq'],
            });

            const queryOptions = {
                index: ['sk-index', 'using'],
            };

            try {
                const { success, message, code, data } = await query({
                    condition,
                    queryOptions,
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
