/**
 * TODO
 * GSI-PK #applyRoute#YYYY-MM 아래 있는 데이터들을 모두 제거. busId #YYYY-MM 의 Attribute 인 register count가 0으로 셋팅
 * delete 까지 같이 작업하세요.
 */
const { get, deleteItem, update } = require('../../../../services/dynamoose');
const getRouteInfo = require('../../../../services/route/getRouteInfo');

const resolvers = {
    Mutation: {
        resetMonthRoute: async (parent, { busId, month, route }, { user }) => {
            if (!user || user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            try {
                let { success, message, code, data } = {};

                ({ success, message, code, data } = await get({
                    partitionKey: busId,
                    sortKey: `#${month}`,
                }));

                if (!data) {
                    return { success: false, message: '없는 노선 정보 ', code };
                }

                ({ success, message, code, data } = await get({
                    partitionKey: busId,
                    sortKey: `#info`,
                }));

                if (data.gsiSortKey !== route) {
                    return { success: false, message: 'invalid route', code: 400 };
                }

                const userList = (
                    await getRouteInfo({
                        sortKey: `#applyRoute#${month}`,
                        gsiSortKey: route,
                    })
                ).result.map((item) => {
                    return {
                        partitionKey: item.partitionKey,
                        sortKey: `#applyRoute#${month}`,
                    };
                });

                const bus = {
                    partitionKey: busId,
                    sortKey: `#${month}`,
                };

                for (let user of userList) {
                    ({ success, message, code } = await deleteItem(user));
                }

                ({ success, message, code } = await update({
                    primaryKey: bus,
                    updateItem: { registerCount: 0 },
                    method: '$SET',
                }));

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
