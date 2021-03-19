const vus = require('../../model/vus');

const getRouteInfoByMonth = async ({ sortKey, gsiSortKey, route }) => {
    try {
        const result = await vus
            .query('sortKey')
            .eq(sortKey)
            .where('gsiSortKey')
            .eq(gsiSortKey)
            .where('route')
            .eq(route)
            .using('sk-index')
            .exec();

        if (result.count === 0) {
            return { success: false, message: 'NullValue' };
        }
        return { success: true, message: 'getRoute', result };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = getRouteInfoByMonth;
