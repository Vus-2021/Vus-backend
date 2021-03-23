const vus = require('../../model/vus');

const createRouteDetail = async ({ partitionKey, sortKey, gsiSortKey, routeDetail }) => {
    try {
        await new vus({
            partitionKey,
            sortKey,
            gsiSortKey,
            ...routeDetail,
        }).save();

        return { success: true, message: 'success crete Route detail', code: 201 };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = createRouteDetail;
