const { createRoute, getRouteByGSI } = require('../../../services/route');
const uuid = require('uuid');
/**
 * TODO 토큰 적용하면 ADMIN만 Route를 생성 가능하게!
 */

const resolvers = {
    Mutation: {
        createRoute: async (_, args) => {
            const { createdAt, busNumber, limitCount, driver, route } = args;
            try {
                const [partitionKey, sortKey, gsiSortKey] = [
                    uuid.v4(),
                    '#info',
                    `createdAt#${createdAt}`,
                ];

                const { success: alreadyRoute } = await getRouteByGSI({
                    sortKey,
                    gsiSortKey,
                    route,
                });

                if (alreadyRoute) {
                    return { success: false, message: 'alreadyRoute' };
                }

                const { success, message } = await createRoute({
                    partitionKey,
                    sortKey,
                    gsiSortKey,
                    busNumber,
                    limitCount,
                    registerCount: 0,
                    driver,
                    route,
                });

                return { success, message };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
