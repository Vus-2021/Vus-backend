const uploadS3 = require('../../../../modules/s3');
const { get, query, transaction } = require('../../../../services');

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
            const Update = [];
            try {
                const thisRoute = (await get({ partitionKey, sortKey: '#info' })).data;
                console.log(thisRoute);
                let detailList;
                if (route !== thisRoute.gsiSortKey) {
                    const { data: details } = await query({
                        params: {
                            sortKey: ['#detail', 'eq'],
                            index: ['sk-index', 'using'],
                        },
                        filterExpression: {
                            route: [thisRoute.gsiSortKey, 'eq'],
                        },
                    });
                    console.log(details);
                    detailList = details.map((item) => {
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

                const driverPk = { partitionKey: driver.userId, sortKey: '#driver' };

                if (detailList) {
                    for (let detail of detailList) {
                        let { partitionKey, sortKey, ...updateDetail } = detail;
                        Update.push({
                            primaryKey: { partitionKey, sortKey },
                            updateItem: updateDetail,
                            method: 'SET',
                        });
                    }
                }

                Update.push({
                    primaryKey: driverPk,
                    updateItem: {
                        busId: partitionKey,
                        gsiSortKey: updateItem.gsiSortKey,
                    },
                    method: 'SET',
                });

                Update.push({
                    primaryKey: {
                        partitionKey,
                        sortKey: '#info',
                    },
                    updateItem,
                    method: 'SET',
                });
                const { success, message, code } = await transaction({ Update });
                return { success, message, code };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
