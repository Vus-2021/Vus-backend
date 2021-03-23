const vus = require('../../model/vus');

const getAllRouteInfoByMonth = async ({ sortKey, gsiSortKey }) => {
    try {
        const result = await vus
            .query('sortKey')
            .eq(sortKey)
            .where('gsiSortKey')
            .beginsWith(gsiSortKey)
            .using('sk-index')
            .exec();

        return { success: true, message: 'getRoutes', code: 200, result };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getAllRouteInfoByMonth;
