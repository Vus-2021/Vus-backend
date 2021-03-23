const resolvers = {
    Query: {
        getMyInformation: (parent, args, context) => {
            if (!context.user) return { success: false, message: context.message, code: 400 };

            return {
                success: true,
                message: 'success get my information',
                code: 200,
                data: context.user,
            };
        },
    },
};

module.exports = resolvers;
