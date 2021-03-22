const resolvers = {
    Query: {
        getMyInformation: (parent, args, context) => {
            if (!context.user) return { success: false, message: context.message };

            return { success: true, message: 'success get my information', data: context.user };
        },
    },
};

module.exports = resolvers;
