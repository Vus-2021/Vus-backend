const { query } = require('../../../../services');

const resolvers = {
    Query: {
        getDrivers: async () => {
            const params = {
                sortKey: ['#user', 'eq'],
                index: ['sk-index', 'using'],
            };

            const filterExpression = {
                type: ['DRIVER', 'eq'],
            };

            try {
                const { success, message, code, data } = await query({
                    params,
                    filterExpression,
                });
                data.forEach((user) => {
                    user.registerDate = user.gsiSortKey.split('#')[2];
                    user.userId = user.partitionKey;
                });

                let { data: driverState } = await query({
                    params: {
                        sortKey: ['#driver', 'eq'],
                        index: ['sk-index', 'using'],
                    },
                });

                console.log(driverState);
                return { success, message, code, data };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
