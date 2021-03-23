const { getDriverNotice } = require('../../../services/notice');
const dateNow = require('../../../modules/dateNow');

const resolvers = {
    Query: {
        getDriverNotice: async (_, { route }) => {
            try {
                const today = dateNow().split(' ')[0];
                const [sortKey, index, noticeType, gsiSortKey] = [
                    '#notice',
                    'sk-index',
                    'DRIVER',
                    `#createdAt#${today}`,
                ];
                const { success, message, data, code } = await getDriverNotice({
                    sortKey,
                    index,
                    route,
                    noticeType,
                    gsiSortKey,
                });

                if (data.count === 0)
                    return { success, message, code, data: { notice: '좋은 하루 되세요.' } };

                const routeMap = new Map()
                    .set('GANGNAM', '강남')
                    .set('ANSAN', '안산')
                    .set('SUNGNAM', '성남')
                    .set('BYEONGJEOM', '병점')
                    .set('MANGPO', '망포');

                const delayCalculate = (notice) => {
                    return `${routeMap.get(notice.route)}발 버스는 ${
                        notice.status.split('M')[1]
                    }분 늦게 출발합니다. `;
                };

                let notice = Object.assign(
                    { ...data[0] },
                    {
                        createdAt: data[0].gsiSortKey.split('#')[2],
                        notice:
                            data[0].gsiSortKey.split('#')[2].split(' ')[0] === today
                                ? delayCalculate(data[0])
                                : '좋은 하루 되세요.',
                    }
                );
                return { success, message, code, data: notice };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
