const _ = require('lodash');
const vus = require('../../model/vus');

const getRouteByUserId = async ({ partitionKey, sortKey }) => {
    try {
        const result = await vus.get({ partitionKey, sortKey });
        if (_.isNil(result)) {
            return { success: false, message: '결과 없음.' };
        }

        return { success: true, message: '조회 성공', code: 200, data: result };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = getRouteByUserId;
