const { getAdminNotice } = require('../../../services/notice');

const resolvers = {
    Query: {
        getAdminNotice: async () => {
            try {
                const [sortKey, index, noticeType] = ['#notice', 'sk-index', 'ADMIN'];
                const { success, message, code, data } = await getAdminNotice({
                    sortKey,
                    index,
                    noticeType,
                });
                data.forEach((item) => {
                    item.createdAt = item.gsiSortKey.split('#')[2];
                    item.author = { name: item.name, userId: item.userId };
                });
                return { success, message, code, data };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
