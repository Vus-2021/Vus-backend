const vus = require('../../model/vus');

const createRoute = async ({
    partitionKey,
    sortKey,
    gsiSortKey,
    busNumber,
    limitCount,
    registerCount,
    driver,
    route,
}) => {
    try {
        await new vus({
            partitionKey,
            sortKey,
            gsiSortKey,
            busNumber,
            limitCount,
            registerCount,
            driver,
            route,
        }).save();

        return { success: true, message: 'success crete Route' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = createRoute;
