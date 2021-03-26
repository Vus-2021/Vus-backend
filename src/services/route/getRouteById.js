const vus = require('../../model/vus');

const getRouteById = async ({ partitionKey, sortKey }) => {
    try {
        const route = await vus.get({ partitionKey, sortKey });

        if (!route) {
            return { success: false, message: 'invalid route', code: 400, route: null };
        }
        return { success: true, message: 'get route', code: 200, route };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getRouteById;
