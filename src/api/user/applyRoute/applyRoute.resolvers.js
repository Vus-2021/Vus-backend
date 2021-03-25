const { applyRoute, getApplyRouteByUserId, getRouteInfo } = require('../../../services/route');
/**
 * TODO Token
 */
const resolvers = {
    Mutation: {
        applyRoute: async (_, { route, month }, { user }) => {
            try {
                const { success: alreadyApply } = await getApplyRouteByUserId({
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${month}`,
                });

                if (alreadyApply) {
                    return { success: false, message: 'already Apply', code: 400 };
                }

                const { success: isValidRouteInfo, result } = await getRouteInfo({
                    sortKey: '#info',
                    gsiSortKey: route,
                });

                if (!isValidRouteInfo) {
                    return { success: false, message: 'invalid route info', code: 400 };
                }

                const userApplyData = {
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${month}`,
                    gsiSortKey: route,
                    state: 'pending',
                };

                const busInfo = {
                    partitionKey: result[0].partitionKey,
                    sortKey: `#${month}`,
                };
                const { success, message, code } = await applyRoute({
                    userApplyData,
                    busInfo,
                });

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
