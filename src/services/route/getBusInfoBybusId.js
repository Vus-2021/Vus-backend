const vus = require('../../model/vus');

const getBusInfo = async ({ partitionKey, sortKey }) => {
    try {
        const bus = await vus
            .query('partitionKey')
            .eq(partitionKey)
            .where('sortKey')
            .beginsWith(sortKey)
            .exec();

        return { success: true, message: 'success get bus info', code: 200, data: bus };
    } catch (error) {
        return { success: false, message: 'failed get bus info', code: 500 };
    }
};

module.exports = getBusInfo;
