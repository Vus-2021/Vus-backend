const { createNotice } = require('../../../services/notice');
const dateNow = require('../../../modules/dateNow');
const uuid = require('uuid');
/**
 * TODO auth => only Admin
 */
const resolvers = {
    Mutation: {
        createAdminNotice: async (_, { noticeType, notice }, { user }) => {
            if (user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            try {
                const [partitionKey, sortKey, gsiSortKey] = [
                    uuid.v4(),
                    '#notice',
                    `#createdAt#${dateNow()}`,
                ];
                const { success, message, code } = await createNotice({
                    partitionKey,
                    sortKey,
                    gsiSortKey,
                    noticeType,
                    notice,
                    userId: user.userId,
                    name: user.name,
                });

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
