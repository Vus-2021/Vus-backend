/**
 * array 트랜잭션 처리를 못하겠다.
 */
const vus = require('../../model/vus');

const deleteRouteAndDetails = async ({ detailList, routeInfo }) => {
    try {
        await vus.batchDelete(detailList);
        await vus.delete(routeInfo);
        return { success: true, message: '노선 삭제 완료', code: 204 };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = deleteRouteAndDetails;
