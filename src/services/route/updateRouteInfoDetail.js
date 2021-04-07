const vus = require('../../model/vus');

const updateDetailRoute = async ({ primaryKey, updateItem, detailList, userPk }) => {
    try {
        if (detailList) {
            for (let item of detailList) {
                let { partitionKey, sortKey, ...updateDetail } = item;
                await vus.update({ partitionKey, sortKey }, updateDetail);
            }
        }
        await vus.update(userPk, {
            $SET: { busId: primaryKey.partitionKey, gsiSortKey: updateItem.gsiSortKey },
        });
        await vus.update(primaryKey, { $SET: updateItem });
        return { success: true, message: 'success update', code: 204 };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = updateDetailRoute;
