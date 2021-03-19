const vus = require('../../model/vus');

const getRouteInfoByMonth = async ({ sortKey, gsiSortKey }) => {
    try {
        const result = await vus
            .query('sortKey')
            .eq(sortKey)
            .where('gsiSortKey')
            .eq(gsiSortKey)
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

module.exports = getRouteInfoByMonth;
