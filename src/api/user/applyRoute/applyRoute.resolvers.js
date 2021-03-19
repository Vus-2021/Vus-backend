const { applyRoute, getApplyRouteByPK } = require('../../../services/route');
/**
 * TODO Transaction applyRoute + count
 */
const resolvers = {
    Mutation: {
        applyRoute: async (_, { route, month }) => {
            const user = {
                userId: 'test',
                name: '최영훈',
                type: 'VT',
            };
            try {
                const [partitionKey, sortKey, state] = [
                    user.userId,
                    `#applyRoute#${month}`,
                    'pending',
                ];

                const { success: alreadyApply } = await getApplyRouteByPK({
                    partitionKey,
                    sortKey,
                });

                if (alreadyApply) {
                    return { success: false, message: 'already Apply' };
                }

                /**
                 * TODO 신청할때 차량의 partitionKey, sortkey 받기.
                 */

                const { success, message } = await applyRoute({
                    partitionKey,
                    route,
                    sortKey,
                    state,
                });

                return { success, message };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
