const uploadS3 = require('../../../../modules/s3');
const { get, update, query } = require('../../../../services');

const resolvers = {
    Mutation: {
        updateRoute: async (
            _,
            { partitionKey, route, busNumber, limitCount, driver, file },
            { user }
        ) => {
            if (!user || user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            let updateItem;
            updateItem = { gsiSortKey: route, busNumber, limitCount, driver };
            let { success, message, code } = {};
            try {
                const thisRoute = (await get({ partitionKey, sortKey: '#info' })).data;
                let detailList;
                if (route !== thisRoute.gsiSortKey) {
                    const details = await query({
                        sortKey: ['#detail', 'eq'],
                        route: [thisRoute.gsiSortKey, 'eq'],
                        index: ['sk-index', 'using'],
                    });
                    detailList = details.routeDetails.map((item) => {
                        return {
                            partitionKey: item.partitionKey,
                            sortKey: '#detail',
                            route: route,
                            gsiSortKey: item.gsiSortKey,
                            location: item.location,
                            lat: item.lat,
                            long: item.long,
                        };
                    });
                }

                if (file) {
                    const { createReadStream, filename } = await file;
                    const fileStream = createReadStream();
                    const fileInfo = await uploadS3({ fileStream, filename });
                    updateItem = Object.assign(updateItem, { imageUrl: fileInfo.Location });
                }

                const userPk = { partitionKey: driver.userId, sortKey: '#driver' };

                if (detailList) {
                    for (let detail of detailList) {
                        let { partitionKey, sortKey, ...updateDetail } = detail;
                        ({ success, message, code } = await update({
                            primaryKey: { partitionKey, sortKey },
                            updateItem: updateDetail,
                            method: '$SET',
                        }));
                    }
                }

                ({ success, message, code } = await update({
                    primaryKey: userPk,
                    updateItem: {
                        busId: partitionKey,
                        gsiSortKey: updateItem.gsiSortKey,
                        method: '$SET',
                    },
                }));

                ({ success, message, code } = await update({
                    primaryKey: {
                        partitionKey,
                        sortKey: '#info',
                    },
                    updateItem,
                    method: '$SET',
                }));

                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
