const dayjs = require('dayjs');
const _ = require('lodash');

const { applyRoute, getRouteInfo } = require('../../../services/route');
const { get } = require('../../../services/dynamoose');

/**
 * TODO Token
 */
const resolvers = {
    Mutation: {
        applyRoute: async (parent, { route, month, partitionKey, userId }, { user }) => {
            if (!user) {
                return { success: false, message: 'access denied', code: 403 };
            }
            if (userId) {
                user.userId = userId;
            }

            try {
                const { data: alreadyApply } = await get({
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${month}`,
                });

                if (alreadyApply) {
                    return { success: false, message: 'already Apply', code: 400 };
                }

                const { result } = await getRouteInfo({
                    sortKey: '#info',
                    gsiSortKey: route,
                });

                if (result.count === 0) {
                    return { success: false, message: 'invalid route info', code: 400 };
                }
                const { data: previousMonth } = await get({
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${dayjs(month).subtract(1, 'month').format('YYYY-MM')}`,
                });
                const previousMonthState = _.isNil(previousMonth)
                    ? 'notApply'
                    : previousMonth.state;

                const { data: userInfo } = await get({
                    partitionKey: user.userId,
                    sortKey: '#user',
                });

                const userApplyData = {
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${month}`,
                    gsiSortKey: route,
                    state: 'pending',
                    isCancellation: false,
                    busId: partitionKey,
                    previousMonthState,
                    registerDate: userInfo.gsiSortKey.split('#')[2],
                };

                const busInfo = {
                    partitionKey: result[0].partitionKey,
                    sortKey: `#${month}`,
                };
                const { success, message, code } = await applyRoute({
                    userApplyData,
                    busInfo,
                });

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
