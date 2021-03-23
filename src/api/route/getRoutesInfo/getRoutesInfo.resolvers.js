const { getAllRouteInfoByMonth } = require('../../../services/route');

const resolvers = {
    Query: {
        getRoutesInfo: async (_, { month }) => {
            try {
                const [sortKey, gsiSortKey] = ['#info', `#month#${month}`];
                const { success, message, code, result: data } = await getAllRouteInfoByMonth({
                    sortKey,
                    gsiSortKey,
                });

                return { success, message, code, data };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
