const { createDriverNotice } = require('../../../services/route');
const dateNow = require('../../../modules/dateNow');
const uuid = require('uuid');

const resolvers = {
    Mutation: {
        createDriverNotice: async (_, { route, delayTime, noticeType }) => {
            try {
                const [partitionKey, sortKey, gsiSortKey] = [uuid.v4(), '#notice', dateNow()];
                const { success, message } = await createDriverNotice({
                    partitionKey,
                    sortKey,
                    gsiSortKey,
                    route,
                    delayTime,
                    noticeType,
                });

                return { success, message };
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
