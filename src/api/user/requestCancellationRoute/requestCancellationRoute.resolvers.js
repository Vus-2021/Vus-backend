const getUserById = require('../../../services/user/getUserById');
const getRouteById = require('../../../services/route/getRouteById');
const updateUser = require('../../../services/user/updateUser');
/**
 * TODO applyRoute 값 확인 후 isCancellation 값 업데이트를 해주자.
 */

const resolvers = {
    Mutation: {
        requestCancellationRoute: async (parent, { busId, month }, { user }) => {
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
                const updateItem = { state: 'requestCancle' };
                ({ success, message, code } = await updateUser({
                    primaryKey: userInfo,
                    updateItem,
                }));

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
