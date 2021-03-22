const resolvers = {
    Query: {
        getMyInformation: (parent, args, { user }) => {
            if (!user) return { success: false, message: 'failed get my information' };

            return { success: true, message: 'success get my information', data: user };
        },
    },
};

module.exports = resolvers;
