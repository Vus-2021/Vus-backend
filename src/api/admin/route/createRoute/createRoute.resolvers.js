const { createRoute } = require('../../../../services/route');
const uuid = require('uuid');
const uploadS3 = require('../../../../modules/s3');

const resolvers = {
    Mutation: {
        createRoute: async (_, args, { user }) => {
            if (!user || user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            const { busNumber, limitCount, driver, route } = args;
            const [partitionKey, sortKey, gsiSortKey] = [uuid.v4(), '#info', route];
            try {
                let routeInfo;
                if (!args.file) {
                    routeInfo = { busNumber, limitCount, driver };
                } else {
                    const { createReadStream, filename } = await args.file;
                    const fileStream = createReadStream();
                    const fileInfo = await uploadS3({ fileStream, filename });
                    routeInfo = {
                        busNumber,
                        limitCount,
                        driver,
                        imageUrl: fileInfo.Location,
                    };
                }

                const { success, message, code } = await createRoute({
                    partitionKey,
                    sortKey,
                    gsiSortKey,
                    routeInfo,
                });

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
