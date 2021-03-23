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
        applyRoute: async (_, { route, month }, { user }) => {
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
                    return { success: false, message: 'already Apply', code: 400 };
                }

                const routeMap = new Map()
                    .set('GANGNAM', '1')
                    .set('BYEONGJEOM', '2')
                    .set('ANSAN', '3')
                    .set('MANGPO', '4')
                    .set('SUNGNAM', '5');

                const { success: isValidRouteInfo, result } = await getRouteInfoByMonth({
                    sortKey: '#info',
                    route: route,
                    gsiSortKey: `#month#${month}#${routeMap.get(route)}`,
                });

                if (!isValidRouteInfo) {
                    return { success: false, message: 'invalid route info', code: 400 };
                }

                const createPK = { partitionKey, sortKey, route, state };

                const updatePK = {
                    partitionKey: result[0].partitionKey,
                    sortKey: result[0].sortKey,
                };

                const { success, message, code } = await applyRoute({
                    createPK,
                    updatePK,
                });

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
