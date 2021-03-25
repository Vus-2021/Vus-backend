const vus = require('../../model/vus');

const getRouteInfo = async ({ sortKey, gsiSortKey }) => {
    try {
        const result = await vus
            .query('sortKey')
            .eq(sortKey)
            .where('gsiSortKey')
            .eq(gsiSortKey)
            .using('sk-index')
            .exec();

        if (result.count === 0) {
            return { success: false, message: 'NullValue', code: 200 };
        }

        return { success: true, message: 'getRoute', code: 200, result };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getRouteInfo;
