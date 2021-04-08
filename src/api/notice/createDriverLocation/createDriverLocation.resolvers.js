const createDriverLocation = require('../../../services/route/createDriverLocation');

const resolvers = {
    Mutation: {
        createDriverLocation: async (parent, args) => {
            const { preKey, destinationKey } = args.input;

            try {
                const { success, message, code } = await createDriverLocation({
                    preKey,
                    destinationKey,
                });

                return { success, message, code };
            } catch (error) {
                return { success: false, message: 'asda', code: 500 };
            }
        },
    },
};

module.exports = resolvers;
