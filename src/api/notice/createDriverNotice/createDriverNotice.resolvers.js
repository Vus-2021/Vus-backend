const { createNotice } = require('../../../services/route');
const dateNow = require('../../../modules/dateNow');
const uuid = require('uuid');
/**
 * TODO auth => only Driver
 */
const resolvers = {
    Mutation: {
        createDriverNotice: async (_, { route, status, noticeType }) => {
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
                    route,
                    status,
                    noticeType,
                });

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
