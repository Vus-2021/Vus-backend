const Dynamo = require('../../model/vus');

const createRoute = async ({
    partitionKey,
    sortKey,
    gsiSortKey,
    busNumber,
    limitCount,
    registerCount,
    driver,
}) => {
    try {
        await new Dynamo({
            partitionKey,
            sortKey,
            gsiSortKey,
            busNumber,
            limitCount,
            registerCount,
            driver,
        }).save();

        return { success: true, message: 'success crete Route' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = createRoute;
