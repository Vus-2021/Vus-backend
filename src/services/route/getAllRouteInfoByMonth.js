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

        if (result.count === 0) {
            return { success: false };
        }
        return { success: true, message: 'getRoutes', result };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = getAllRouteInfoByMonth;
