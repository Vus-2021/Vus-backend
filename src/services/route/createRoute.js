const Dynamo = require('../../model/vus');

const createRoute = async ({
    routeName,
    createdAt,
    busNumber,
    limitCount,
    registerCount,
    driver,
}) => {
    try {
        await new Dynamo({
            partitionKey: routeName,
            sortKey: '#info',
            gsiSortKey: createdAt,
            busNumber,
            limitCount,
            registerCount,
            driver,
        }).save();

        return { success: true, message: 'success crete Route' };
    } catch (error) {
        return { success: false, message: 'InternalServerError - createRoute' };
    }
};

module.exports = createRoute;
