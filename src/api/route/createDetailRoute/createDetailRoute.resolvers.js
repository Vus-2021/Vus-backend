const uuid = require('uuid');
/**
 * TODO 토큰 적용하면 ADMIN만 Route를 생성 가능하게!
 */
const resolvers = {
    Mutation: {
        createRoute: async (_, args) => {
            const { location, route, imageUrl, x, y, boardingTime } = args;
            try {
                const [partitionKey, sortKey, gsiSortKey] = [
                    uuid.v4(),
                    '#detail',
                    `boardingTime#${boardingTime}`,
                ];
            } catch (error) {
                return { success: false, message: error.message };
            }
        },
    },
};

module.exports = resolvers;
