const { createRoute, getRouteByCreatedAt } = require('../../../services/route');

const resolvers = {
    Mutation: {
        createRoute: async (_, args) => {
            const { routeName: partitionKey, createdAt, busNumber, limitCount, driver } = args;
            try {
                const sortKey = `#info#${createdAt}`;
                const { success: alreadyRoute } = await getRouteByCreatedAt({
                    partitionKey,
                    sortKey,
                });
                if (alreadyRoute) {
                    return { success: false, message: 'alreadyRoute' };
                }

                const { success, message } = await createRoute({
                    partitionKey,
                    sortKey,
                    createdAt,
                    busNumber,
                    limitCount,
                    registerCount: 0,
                    driver,
                });

                return { success, message };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
