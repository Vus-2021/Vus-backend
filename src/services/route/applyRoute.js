const vus = require('../../model/vus');
const dynamoose = require('dynamoose');
/**
 * TODO Transaction mock데이터 수정해주기 동작은 잘됨!
 */
const applyRoute = async ({ partitionKey, sortKey, route, state }) => {
    try {
        await dynamoose.transaction([
            vus.transaction.create({ partitionKey, sortKey, route, state }),
            vus.transaction.update(
                { partitionKey: '0f69e5c1-209d-4d72-a54e-cdcb23b8f100', sortKey: '#info' },
                { $ADD: { registerCount: 1 } }
            ),
        ]);
        return { success: true, message: '접수 성공' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = applyRoute;
