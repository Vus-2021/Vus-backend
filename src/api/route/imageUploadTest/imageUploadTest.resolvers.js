const { GraphQLUpload } = require('apollo-server');

const s3 = require('../../../modules/s3');

const resolvers = {
    FileUpload: GraphQLUpload,
    Mutation: {
        singleUpload: async (_, { file }) => {
            const { creatReadStream, filename, mimetype, encoding } = await file;
            const stream = creatReadStream();
            s3(stream);
            return { filename, mimetype, encoding };
        },
    },
};

module.exports = resolvers;
