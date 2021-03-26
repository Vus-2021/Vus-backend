/**
 * array를 트랜잭션 처리를 못하겠다.
 */
const vus = require('../../model/vus');

const resetRoute = async ({ userList, bus }) => {
    try {
        await vus.batchDelete(userList);
        await vus.update(bus, { $SET: { registerCount: 0 } });
        return { success: true, message: '리셋 완료', code: 204 };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = resetRoute;
