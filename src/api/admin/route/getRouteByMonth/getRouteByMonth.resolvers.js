const getBusInfoByBusId = require('../../../../services/route/getBusInfoBybusId');
const { query } = require('../../../../services/dynamoose');
const queryBuild = require('../../../../modules/queryBuild');

const resolvers = {
    Query: {
        getRouteByMonth: async (parent, { partitionKey }) => {
            const condition = queryBuild({
                partitionKey: [partitionKey, 'eq'],
                sortKey: ['#2', 'beginsWith'],
            });

            try {
                const { success, message, code, data } = await query({
                    condition,
                });
                data.forEach((item) => {
                    item.month = item.sortKey.split('#')[1];
                });
                return { success, message, code, data };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
