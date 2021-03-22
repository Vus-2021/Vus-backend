const vus = require('../../model/vus');

const createRoute = async ({ partitionKey, sortKey, gsiSortKey, route, delayTime, noticeTime }) => {
    try {
        await new vus({
            partitionKey,
            sortKey,
            gsiSortKey,
            route,
            delayTime,
            noticeTime,
        }).save();

        return { success: true, message: 'success crete driver notice' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = createRoute;
