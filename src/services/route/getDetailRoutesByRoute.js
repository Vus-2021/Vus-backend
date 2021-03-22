const vus = require('../../model/vus');

const getDetailRoutesByRoute = async ({ sortKey, route, index }) => {
    try {
        const routeDetails = await vus
            .query('sortKey')
            .eq(sortKey)
            .where('route')
            .eq(route)
            .sort('ascending')
            .using(index)
            .exec();

        return { success: true, message: 'getRoute', routeDetails };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = getDetailRoutesByRoute;
