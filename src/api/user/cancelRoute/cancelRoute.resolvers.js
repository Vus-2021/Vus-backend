const dayjs = require('dayjs');

const cancelRouteByUpdate = require('../../../services/route/cancelRouteByUpdate');
const cancelRouteByDelete = require('../../../services/route/cancleRouteByDelete');
const { get } = require('../../../services');

/**
 * TODO 신청 취소할때. 취소한 월이 탑승 월보다 전일때는 컬럼을 삭제, 그게 아니면 cancelled toggle,
 */

const resolvers = {
    Mutation: {
        cancelRoute: async (parent, { busId, month }, { user }) => {
            const nowMonth = dayjs(new Date()).format('YYYY-MM');
            if (!user) {
                return { success: false, message: 'access denied', code: 403 };
            }
            try {
                const userInfo = {
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${month}`,
                };

                let { success, message, code, data } = {};

                ({ success, message, code, data } = await get({
                    partitionKey: user.userId,
                    sortKey: `#applyRoute#${month}`,
                }));

                if (!data) {
                    return { success: false, message: '이미 취소 되었음', code: 400 };
                }

                if (data.isCancellation) {
                    return { success: false, message: '이미 취소되었음', code: 400 };
                }

                ({ success, message, code, data } = await get({
                    partitionKey: busId,
                    sortKey: `#${month}`,
                }));

                if (!data) {
                    return { success: false, message: '버스 정보가 일치하지 않음.', code: 400 };
                }

                const bus = {
                    partitionKey: busId,
                    sortKey: `#${month}`,
                };

                if (nowMonth === month) {
                    ({ success, message, code } = await cancelRouteByUpdate({ userInfo, bus }));
                } else {
                    ({ success, message, code } = await cancelRouteByDelete({ userInfo, bus }));
                }
                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
