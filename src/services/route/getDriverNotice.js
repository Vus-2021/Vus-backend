const vus = require('../../model/vus');

const getDetailRoutesByRoute = async ({ sortKey, currentLocation, index }) => {
    try {
        let routeDetails = await vus
            .query('sortKey')
            .eq(sortKey)
            .where('currentLocation')
            .eq(currentLocation)
            .sort('ascending')
            .using(index)
            .exec();

        return { success: true, message: 'getRoute', code: 201, routeDetails };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getDetailRoutesByRoute;
