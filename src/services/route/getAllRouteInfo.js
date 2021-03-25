const vus = require('../../model/vus');

const getAllRouteInfo = async ({ sortKey }) => {
    try {
        const result = await vus.query('sortKey').eq(sortKey).using('sk-index').exec();

        return { success: true, message: 'getRoutes', code: 200, result };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getAllRouteInfo;
