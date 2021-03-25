const vus = require('../../model/vus');
const dynamoose = require('dynamoose');
/**
 * TODO Transaction mock데이터 수정해주기 동작은 잘됨!
 */
const applyRoute = async ({ userApplyData, busInfo }) => {
    try {
        await dynamoose.transaction([
            vus.transaction.create(userApplyData),
            vus.transaction.update(busInfo, { $ADD: { registerCount: 1 } }),
        ]);
        return { success: true, message: '접수 성공', code: 201 };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = applyRoute;
