const { getDetailRoutesByRoute } = require('../../../services/route');

const resolvers = {
    Query: {
        getDetailRoutes: async (_, { route }) => {
            try {
                const [sortKey, index] = ['#detail', 'sk-index'];
                const { success, message, routeDetails: data } = await getDetailRoutesByRoute({
                    sortKey,
                    route,
                    index,
                });
                data.forEach((item) => {
                    item.boardingTime = item.gsiSortKey.split('#')[2];
                });
                return { success, message, data };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
