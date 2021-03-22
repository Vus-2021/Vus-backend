const vus = require('../../model/vus');

const createRoute = async ({ partitionKey, sortKey, gsiSortKey, route, status, noticeType }) => {
    try {
        await new vus({
            partitionKey,
            sortKey,
            gsiSortKey,
            route,
            status,
            noticeType,
        }).save();

        return { success: true, message: 'success crete driver notice' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = createRoute;
