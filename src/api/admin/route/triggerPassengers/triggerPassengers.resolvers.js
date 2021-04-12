const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');

const applyRoulette = require('../../../../services/route/applyRoulette');
const { get, update, query } = require('../../../../services/dynamoose');
dayjs.extend(duration);

const resolvers = {
    Mutation: {
        triggerPassengers: async (parent, { month, route, busId }) => {
            let { success, message, code, data } = {};

            try {
                const bus = await get({ partitionKey: busId, sortKey: '#info' });

                ({ success, message, code, result: data } = await query({
                    params: {
                        sortKey: [`#applyRoute#${month}`, 'eq'],
                        gsiSortKey: [route, 'eq'],
                    },
                }));
                let applicants = data.sort(() => Math.random() - Math.random());
                const limitCount = bus.data.limitCount;
                const { fulfilled, reject } = applyRoulette({ applicants, limitCount });
                const fulfilledKeys = fulfilled.map((item) => {
                    return {
                        partitionKey: item.partitionKey,
                        sortKey: item.sortKey,
                    };
                });

                const rejectKeys = reject.map((item) => {
                    return {
                        partitionKey: item.partitionKey,
                        sortKey: item.sortKey,
                    };
                });

                for (let primaryKey of fulfilledKeys) {
                    ({ success, message, code } = await update({
                        primaryKey,
                        updateItem: { state: 'fulfilled' },
                        method: '$SET',
                    }));
                }
                for (let primaryKey of rejectKeys) {
                    ({ success, message, code } = await update({
                        primaryKey,
                        updateItem: { state: 'reject' },
                        method: '$SET',
                    }));
                }

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
