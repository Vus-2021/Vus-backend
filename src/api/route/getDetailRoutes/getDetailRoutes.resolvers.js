const queryBuild = require('../../../modules/queryBuild');
const { query } = require('../../../services/dynamoose');

const resolvers = {
    Query: {
        getDetailRoutes: async (_, { route, currentLocation }) => {
            try {
                let condition = queryBuild({
                    sortKey: ['#detail', 'eq'],
                    route: [route, 'eq'],
                    currentLocation: [currentLocation, 'eq'],
                });

                let queryOptions = {
                    index: ['sk-index', 'using'],
                    sort: ['ascending', 'sort'],
                };

                const { success, message, code, data } = await query({
                    condition,
                    queryOptions,
                });

                data.forEach((item) => {
                    item.boardingTime = item.gsiSortKey.split('#')[2];
                });
                return { success, message, code, data };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
