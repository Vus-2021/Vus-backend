const queryBuild = require('../../../modules/queryBuild');
const { query } = require('../../../services/dynamoose');
const dayjs = require('dayjs');
const resolvers = {
    Query: {
        getDriverNotice: async (parent, { route }) => {
            let { success, message, code, result } = {};
            let condition = queryBuild({
                sortKey: ['#info', 'eq'],
                gsiSortKey: [route, 'eq'],
            });

            let queryOptions = {
                index: ['sk-index', 'using'],
            };

            try {
                ({ success, message, code, data: result } = await query({
                    queryOptions,
                    condition,
                }));
                const data = result.map((item) => {
                    return {
                        route: item.gsiSortKey,
                    };
                });
                const routeMap = new Map();

                ({ success, message, code, data: result } = await query({
                    condition: queryBuild({
                        sortKey: ['#detail', 'eq'],
                        currentLocation: [true, 'eq'],
                    }),
                    queryOptions: {
                        index: ['sk-index', 'using'],
                        sort: ['ascending', 'sort'],
                    },
                }));

                data.forEach((item) => {
                    routeMap.set(item.route, {
                        updatedAt: 'null',
                        route: item.route,
                        location: 'null',
                    });
                });

                result.forEach((item) => {
                    if (routeMap.has(item.route)) {
                        routeMap.set(item.route, {
                            updatedAt: dayjs(item.updatedAt).format('HH:mm'),
                            route: item.route,
                            location: item.location,
                        });
                    }
                });

                return { success, message, code, data: [...routeMap.values()] };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
