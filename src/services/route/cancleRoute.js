const dynamoose = require('dynamoose');

const vus = require('../../model/vus');

const cancleRoute = async ({ userInfo, bus }) => {
    try {
        const transaction = await dynamoose.transaction([
            vus.transaction.delete(userInfo),
            vus.transaction.update(bus, { $ADD: { registerCount: -1 } }),
        ]);
        console.log(transaction);
        return { success: true, message: '통근 버스 취소', code: 204 };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = cancleRoute;
