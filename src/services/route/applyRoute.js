const vus = require('../../model/vus');
const dynamoose = require('dynamoose');
/**
 * TODO Transaction mock데이터 수정해주기 동작은 잘됨!
 */
const applyRoute = async ({ createPK, updatePK }) => {
    try {
        await dynamoose.transaction([
            vus.transaction.create(createPK),
            vus.transaction.update(updatePK, { $ADD: { registerCount: 1 } }),
        ]);
        return { success: true, message: '접수 성공' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = applyRoute;
