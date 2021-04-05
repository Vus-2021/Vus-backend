const updateDetailRoute = require('../../../../services/route/updateDetailRoute');
const uploadS3 = require('../../../../modules/s3');
const resolvers = {
    Mutation: {
        updateDetailRoute: async (
            _,
            { partitionKey, boardingTime, lat, long, location, route, file },
            { user }
        ) => {
            if (!user || user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            let { success, message, code } = {};

            let updateItem = Object.assign({
                gsiSortKey: `#boardingTime#${boardingTime}`,
                lat,
                long,
                location,
                route,
            });
            try {
                if (!file) {
                    ({ success, message, code } = await updateDetailRoute({
                        primaryKey: { partitionKey, sortKey: '#detail' },
                        updateItem,
                    }));
                } else {
                    const { createReadStream, filename } = await file;
                    const fileStream = createReadStream();
                    const fileInfo = await uploadS3({ fileStream, filename });

                    ({ success, message, code } = await updateDetailRoute({
                        primaryKey: { partitionKey, sortKey: '#detail' },
                        updateItem: Object.assign(updateItem, { imageUrl: fileInfo.Location }),
                    }));
                }

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
