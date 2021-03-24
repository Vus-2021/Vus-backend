const vus = require('../../model/vus');

const createRoute = async ({
    partitionKey,
    sortKey,
    gsiSortKey,
    busNumber,
    limitCount,
    driver,
}) => {
    try {
        await new vus({
            partitionKey,
            sortKey,
            gsiSortKey,
            busNumber,
            limitCount,
            driver,
        }).save();

        return { success: true, message: 'success crete Route' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = createRoute;
