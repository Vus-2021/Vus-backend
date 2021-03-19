const {
    applyRoute,
    getApplyRouteByUserId,
    getRouteInfoByMonth,
} = require('../../../services/route');
/**
 * TODO Token
 */
const resolvers = {
    Mutation: {
        applyRoute: async (_, { route, month }) => {
            const user = {
                userId: 'V13244',
                name: '최영훈',
                type: 'VT',
            };
            try {
                const [partitionKey, sortKey, state] = [
                    user.userId,
                    `#applyRoute#${month}`,
                    'pending',
                ];

                const { success: alreadyApply } = await getApplyRouteByUserId({
                    partitionKey,
                    sortKey,
                });

                if (alreadyApply) {
                    return { success: false, message: 'already Apply' };
                }

                const { success: isValidRouteInfo, result } = await getRouteInfoByMonth({
                    sortKey: '#info',
                    route: route,
                    gsiSortKey: `month#${month}`,
                });

                if (!isValidRouteInfo) {
                    return { success: false, message: 'invalid route info' };
                }

                const createPK = { partitionKey, sortKey, route, state };

                const updatePK = {
                    partitionKey: result[0].partitionKey,
                    sortKey: result[0].sortKey,
                };

                const { success, message } = await applyRoute({
                    createPK,
                    updatePK,
                });

                return { success, message };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
