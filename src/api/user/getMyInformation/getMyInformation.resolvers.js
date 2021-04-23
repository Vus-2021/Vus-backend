const { query, get } = require('../../../services');

const resolvers = {
    Query: {
        getMyInformation: async (parent, args, context) => {
            if (!context.user) return { success: false, message: context.message, code: 400 };
            const params = {
                partitionKey: [context.user.userId, 'eq'],
            };
            try {
                let { data } = await query({ params, tableName: process.env.TABLE_NAME });
                let info;
                if (context.user.type === 'DRIVER') {
                    info = data
                        .filter((item) => {
                            return item.sortKey === '#driver';
                        })
                        .map((item) => {
                            return Object.assign(item, {
                                route: item.gsiSortKey,
                            });
                        });
                } else {
                    info = data
                        .filter((item) => {
                            return (
                                (item.state === 'pending' || item.state === 'fulfilled') &&
                                !item.isCancellation &&
                                item.sortKey !== '#user'
                            );
                        })
                        .map((item) => {
                            return {
                                partitionKey: item.partitionKey,
                                sortKey: item.sortKey,
                                route: item.gsiSortKey,
                                busId: item.busId,
                                month: item.sortKey.split('#')[2],
                            };
                        });
                }
                const obj = Object.assign(
                    context.user,
                    { routeInfo: info },
                    {
                        routeStates: data
                            .filter((item) => item.sortKey !== '#user')
                            .map((item) => {
                                return {
                                    partitionKey: item.partitionKey,
                                    sortKey: item.sortKey,
                                    route: item.gsiSortKey,
                                    busId: item.busId,
                                    month: item.sortKey.split('#')[2],
                                    state: item.state,
                                    isCancellation: item.isCancellation,
                                    detailPartitionKey: item.detailPartitionKey,
                                };
                            }),
                    }
                );
                if (obj.type !== 'DRIVER') {
                    for (let index in obj.routeStates) {
                        let state = obj.routeStates[index];
                        let details = (
                            await get({
                                partitionKey: state.detailPartitionKey,
                                sortKey: '#detail',
                                tableName: process.env.TABLE_NAME,
                            })
                        ).data;
                        if (details) {
                            obj.routeStates[index] = Object.assign(obj.routeStates[index], {
                                location: details.location,
                                boardingTime: details.gsiSortKey.split('#')[2],
                            });
                        }
                    }
                }
                return {
                    success: true,
                    message: 'success get my information',
                    code: 200,
                    data: obj,
                };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
