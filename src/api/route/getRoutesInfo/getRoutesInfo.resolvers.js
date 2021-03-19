const { getRoutesInfoByMonth } = require('../../../services/route');

const resolvers = {
    Query: {
        getRoutesInfo: async (_, { month }) => {
            try {
                const [sortKey, gsiSortKey] = ['#info', `month#${month}`];
                const { success, message, result: data } = await getRoutesInfoByMonth({
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
