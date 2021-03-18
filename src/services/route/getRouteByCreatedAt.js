const Dynamo = require('../../model/vus');

const getRouteByCreatedAt = async ({ routeName, createdAt }) => {
    try {
        const route = await Dynamo.get({ partitionKey: routeName, sortKey: '#info', createdAt });
        if (!route) {
            return { success: false };
        }
        return { success: true, message: 'getUser', route };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = getRouteByCreatedAt;
