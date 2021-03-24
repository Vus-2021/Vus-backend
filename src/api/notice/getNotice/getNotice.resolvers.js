const { getAdminNotice } = require('../../../services/notice');
const searchValidator = require('../../../modules/searchValidator');
/**
 * TODO 검색 기능 함께 만들기.
 */
const resolvers = {
    Query: {
        getAdminNotice: async (_, args) => {
            const [sortKey, index, noticeType] = ['#notice', 'sk-index', 'ADMIN'];
            const { isMatched, notice, name } = {
                notice: args.notice,
                name: args.name,
                isMatched: args.isMatched || false,
            };
            let condition = searchValidator({ isMatched, notice, name });

            try {
                const { success, message, code, data } = await getAdminNotice({
                    sortKey,
                    index,
                    noticeType,
                    condition,
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
