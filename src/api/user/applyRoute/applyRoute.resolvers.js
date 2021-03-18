const { applyRoute, getApplyRouteByPK } = require('../../../services/route');
/**
 * TODO Transaction applyRoute + count
 */
const resolvers = {
    Mutation: {
        applyRoute: async (_, { route }) => {
            const user = {
                userId: 'V13244',
                name: '최영훈',
                type: 'ADMIN',
            };
            try {
                const month = '2021-03';
                const [partitionKey, sortKey, state] = [user.userId, `#route#${month}`, 'pending'];

                const { success: alreadyApply } = await getApplyRouteByPK({
                    partitionKey,
                    sortKey,
                });

                if (alreadyApply) {
                    return { success: false, message: 'already Apply' };
                }

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
