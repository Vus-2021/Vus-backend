const dynamoose = require('dynamoose');

const vus = require('../../model/vus');

const cancelRouteByDelete = async ({ userInfo, bus }) => {
    try {
        await dynamoose.transaction([
            vus.transaction.delete(userInfo),
            vus.transaction.update(bus, { $ADD: { registerCount: -1 } }),
        ]);
        return { success: true, message: '통근 버스 취소', code: 204 };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = cancelRouteByDelete;
