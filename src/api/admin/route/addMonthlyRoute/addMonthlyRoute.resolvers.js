const addMonthlyRoute = require('../../../../services/route/addMonthlyRoute');

const resolvers = {
    Mutation: {
        addMonthlyRoute: async (_, args, { user }) => {
            if (!user || user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            const { partitionKey, route } = args;

            const routeMap = new Map()
                .set('GANGNAM', '1')
                .set('BYEONGJEOM', '2')
                .set('ANSAN', '3')
                .set('MANGPO', '4')
                .set('SUNGNAM', '5');

            const sortKey = `#${args.month}#${routeMap.get(route)}`;
            try {
                const { success, message, code } = await addMonthlyRoute({
                    partitionKey,
                    sortKey,
                    registerCount: 0,
                });

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
