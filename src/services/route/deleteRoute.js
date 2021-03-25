const vus = require('../../model/vus');

const deleteRoute = async ({ partitionKey, sortKey }) => {
    try {
        await vus.delete({ partitionKey, sortKey });
        return { success: true, message: '노선 삭제 성공', code: 204 };
    } catch (error) {
        return { success: false, message: '서버 에러', code: 500 };
    }
};

module.exports = deleteRoute;
