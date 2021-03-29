const vus = require('../../model/vus');

const getNoticeById = async ({ partitionKey, sortKey }) => {
    try {
        const notice = await vus.get({ partitionKey, sortKey });

        if (!notice) {
            return { success: false, message: 'invalid notice', code: 400, data: null };
        }
        return { success: true, message: 'success get notice', code: 200, data: notice };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getNoticeById;
