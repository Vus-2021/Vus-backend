const vus = require('../../model/vus');

const getAllRouteInfo = async ({ sortKey, gsiSortKey }) => {
    try {
        let Query = vus.query('sortKey').eq(sortKey).using('sk-index');

        if (gsiSortKey) {
            Query = vus
                .query('sortKey')
                .eq(sortKey)
                .where('gsiSortKey')
                .eq(gsiSortKey)
                .using('sk-index');
        }
        const result = await Query.exec();

        return { success: true, message: 'getRoutes', code: 200, result };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getAllRouteInfo;
