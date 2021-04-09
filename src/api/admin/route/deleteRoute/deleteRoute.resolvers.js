const getDetailRoutesByRoute = require('../../../../services/route/getDetailRoutesByRoute');
const { get, deleteItem } = require('../../../../services/dynamoose');
/**
 * TODO onDelete
 */

const resolvers = {
    Mutation: {
        deleteRoute: async (_, { partitionKey }, { user }) => {
            if (!user || user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            const sortKey = '#info';
            try {
                let { success, message, code, data } = await get({ partitionKey, sortKey });
                if (!data) {
                    return { success: false, message: 'invalide Route Id', code: 400 };
                }
                const route = data.gsiSortKey;
                ({ success, message, code, routeDetails: data } = await getDetailRoutesByRoute({
                    sortKey: '#detail',
                    route: route,
                    index: 'sk-index',
                }));
                const detailList = data.map((item) => {
                    return {
                        partitionKey: item.partitionKey,
                        sortKey: '#detail',
                    };
                });

                for (let detail of detailList) {
                    ({ success, message, code } = await deleteItem(detail));
                }
                ({ success, message, code } = await deleteItem({ partitionKey, sortKey }));

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
