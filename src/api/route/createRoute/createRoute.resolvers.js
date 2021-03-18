const { createRoute, getRouteByCreatedAt } = require('../../../services/route');

const resolvers = {
    Mutation: {
        createRoute: async (_, args) => {
            //const driver = JSON.parse(JSON.stringify(args.driver));
            const { routeName, createdAt, busNumber, limitCount, driver } = args;
            try {
                const { success: alreadyRoute } = await getRouteByCreatedAt({
                    routeName,
                    createdAt,
                });
                if (alreadyRoute) {
                    return { success: false, message: 'alreadyRoute' };
                }

                const { success, message } = await createRoute({
                    routeName,
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
