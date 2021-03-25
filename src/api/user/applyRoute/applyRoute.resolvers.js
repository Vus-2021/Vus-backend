const dayjs = require('dayjs');
const _ = require('lodash');

const { applyRoute, getApplyRouteByUserId, getRouteInfo } = require('../../../services/route');
const getPreviousMonthState = require('../../../services/user/getPreviousMonthState');

/**
 * TODO Token
 */
const resolvers = {
    Mutation: {
        applyRoute: async (parent, { route, month }, { user }) => {
            try {
                const { success: alreadyApply } = await getApplyRouteByUserId({
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${month}`,
                });

                if (alreadyApply) {
                    return { success: false, message: 'already Apply', code: 400 };
                }

                const { success: isValidRouteInfo, result } = await getRouteInfo({
                    sortKey: '#info',
                    gsiSortKey: route,
                });

                if (!isValidRouteInfo) {
                    return { success: false, message: 'invalid route info', code: 400 };
                }
                const { data: previousMonth } = await getPreviousMonthState({
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${dayjs(month).subtract(1, 'month').format('YYYY-MM')}`,
                });

                const previousMonthState = _.isNil(previousMonth)
                    ? 'notApply'
                    : previousMonth.state;

                const userApplyData = {
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${month}`,
                    gsiSortKey: route,
                    state: 'pending',
                    previousMonthState,
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
