const createDriverLocation = require('../../../services/route/createDriverLocation');
const dayjs = require('dayjs');

const resolvers = {
    Mutation: {
        createDriverLocation: async (parent, args) => {
            const { preKey, destinationKey, locationIndex } = args.input;

            const updatedAt = dayjs().format('YYYY-MM-DD hh:mm:ss');
            try {
                const { success, message, code } = await createDriverLocation({
                    preKey,
                    destinationKey,
                    updatedAt,
                    locationIndex,
                });
                return { success, message, code };
            } catch (error) {
                return { success: false, message: 'asda', code: 500 };
            }
        },
    },
};

module.exports = resolvers;
