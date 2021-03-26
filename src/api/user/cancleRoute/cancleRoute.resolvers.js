const cancleRoute = require('../../../services/route/cancleRoute');
const getUserById = require('../../../services/user/getUserById');
const getRouteById = require('../../../services/route/getRouteById');

const resolvers = {
    Mutation: {
        cancleRoute: async (parent, { busId, month }, { user }) => {
            if (!user) {
                return { success: false, message: 'access denied', code: 403 };
            }
            try {
                const userInfo = {
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${month}`,
                };

                let { success, message, code } = {};

                ({ success, message, code } = await getUserById({
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${month}`,
                }));

                if (!success) {
                    return { success, message, code };
                }

                ({ success, message, code } = await getRouteById({
                    partitionKey: busId,
                    sortKey: `#${month}`,
                }));

                if (!success) {
                    return { success, message, code };
                }

                const bus = {
                    partitionKey: busId,
                    sortKey: `#${month}`,
                };

                ({ success, message, code } = await cancleRoute({ userInfo, bus }));

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
