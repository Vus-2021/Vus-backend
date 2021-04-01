const { GraphQLUpload } = require('graphql-upload');
const uploadS3 = require('../../../modules/s3');

const resolvers = {
    Upload: GraphQLUpload,
    Mutation: {
        singleUpload: async (_, { file }) => {
            try {
                const { createReadStream, filename, mimetype, encoding } = await file;
                const fileStream = createReadStream();
                uploadS3({ fileStream, filename });
                return { filename, mimetype, url: '123', encoding };
            } catch (error) {
                console.log(error);
            }
        },
    },
};

module.exports = resolvers;
