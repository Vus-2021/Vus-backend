const { getRoutesByGSI } = require('../../../services/route');

const resolvers = {
    Query: {
        getRoutesInfo: async () => {
            try {
                const month = '2021-03';
                const [sortKey, gsiSortKey] = ['#info', `month#${month}`];
                const { success, message, result: data } = await getRoutesByGSI({
                    sortKey,
                    gsiSortKey,
                });

                return { success, message, data };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
