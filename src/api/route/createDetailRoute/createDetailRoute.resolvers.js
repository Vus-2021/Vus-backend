const uuid = require('uuid');

const { createRouteDetail } = require('../../../services/route');
/**
 * TODO 토큰 적용하면 ADMIN만 Route를 생성 가능하게!
 */
const resolvers = {
    Mutation: {
        createRouteDetail: async (_, args) => {
            const { location, route, imageUrl, lat, long, boardingTime } = args;
            try {
                const [partitionKey, sortKey, gsiSortKey] = [
                    uuid.v4(),
                    '#detail',
                    `#boardingTime#${boardingTime}`,
                ];
                const routeDetail = { location, route, imageUrl, lat, long };

                const { success, message } = await createRouteDetail({
                    partitionKey,
                    sortKey,
                    gsiSortKey,
                    routeDetail,
                });

                return { success, message };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
