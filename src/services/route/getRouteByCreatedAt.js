const Dynamo = require('../../model/vus');

const getRouteBySortKey = async ({ partitionKey, sortKey }) => {
    try {
        const route = await Dynamo.get({ partitionKey, sortKey });
        if (!route) {
            return { success: false };
        }
        return { success: true, message: 'getRoute', route };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = getRouteBySortKey;
