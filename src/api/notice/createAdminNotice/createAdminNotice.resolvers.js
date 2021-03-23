const { createNotice } = require('../../../services/route');
const dateNow = require('../../../modules/dateNow');
const uuid = require('uuid');
/**
 * TODO auth => only Admin
 */
const resolvers = {
    Mutation: {
        createAdminNotice: async (_, { noticeType, notice }, { user }) => {
            if (user.type !== 'ADMIN') {
                return { success: false, message: 'access denied' };
            }
            try {
                const [partitionKey, sortKey, gsiSortKey] = [
                    uuid.v4(),
                    '#notice',
                    `#createdAt#${dateNow()}`,
                ];
                const { success, message } = await createNotice({
                    partitionKey,
                    sortKey,
                    gsiSortKey,
                    noticeType,
                    notice,
                    userId: user.userId,
                    userName: user.userName,
                });

                return { success, message };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
