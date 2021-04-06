const vus = require('../../model/vus');

const createRoute = async ({ partitionKey, sortKey, gsiSortKey, routeInfo }) => {
    try {
        await new vus({
            partitionKey,
            sortKey,
            gsiSortKey,
            ...routeInfo,
        }).save();

        return { success: true, message: 'success crete Route' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = createRoute;
