const vus = require('../../model/vus');

const getRouteByGSI = async ({ sortKey, gsiSortKey, route }) => {
    try {
        const alreadyRoute = await vus
            .query('sortKey')
            .eq(sortKey)
            .where('gsiSortKey')
            .eq(gsiSortKey)
            .where('route')
            .eq(route)
            .using('sk-index')
            .exec();

        if (alreadyRoute.count > 0) {
            return { success: false };
        }
        return { success: true, message: 'getRoute', route };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = getRouteByGSI;
