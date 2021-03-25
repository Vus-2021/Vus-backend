const vus = require('../../model/vus');

const getPreviousMonthState = async ({ partitionKey, sortKey }) => {
    console.log({ partitionKey, sortKey });
    try {
        const previousApplyData = await vus.get({ partitionKey, sortKey });
        console.log(previousApplyData);
        return {
            success: true,
            message: 'success! get previouse apply data',
            code: 200,
            data: previousApplyData,
        };
    } catch (error) {
        return { success: false, message: 'failed! get previouse apply data', code: 500 };
    }
};

module.exports = getPreviousMonthState;
