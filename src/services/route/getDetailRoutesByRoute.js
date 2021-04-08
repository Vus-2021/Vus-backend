const vus = require('../../model/vus');

const getDetailRoutesByRoute = async ({ sortKey, route, index, condition }) => {
    try {
        let routeDetails;
        if (!condition) {
            routeDetails = await vus
                .query('sortKey')
                .eq(sortKey)
                .where('route')
                .eq(route)
                .sort('ascending')
                .using(index)
                .exec();
        } else {
            routeDetails = await vus
                .query(condition)
                .where('sortKey')
                .eq(sortKey)
                .where('route')
                .eq(route)
                .sort('ascending')
                .using(index)
                .exec();
        }
        return { success: true, message: 'getRoute', code: 201, routeDetails };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getDetailRoutesByRoute;
