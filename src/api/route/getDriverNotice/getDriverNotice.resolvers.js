const { getDriverNotice } = require('../../../services/route');

const resolvers = {
    Query: {
        getDriverNotice: async (_, { route }) => {
            try {
                const [sortKey, index, noticeType] = ['#notice', 'sk-index', 'DRIVER'];
                const { success, message, data } = await getDriverNotice({
                    sortKey,
                    index,
                    route,
                    noticeType,
                });
                data.forEach((item) => {
                    item.createdAt = item.gsiSortKey.split('#')[2];
                });
                return { success, message, data: data[0] };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
