const vus = require('../../model/vus');
const dynamoose = require('dynamoose');

const createRoute = async ({ createItem, driverPk }) => {
    try {
        await dynamoose.transaction([
            vus.transaction.create({
                createItem,
            }),
            vus.transaction.update(driverPk, {
                $SET: { busId: createItem.partitionKey, gsiSortKey: createItem.gsiSortKey },
            }),
        ]);

        return { success: true, message: 'success crete Route' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = createRoute;
