const vus = require('../../model/vus');
const dynamoose = require('dynamoose');
const _ = require('lodash');

const createDriverLocation = async ({ preKey, destinationKey, updatedAt, locationIndex }) => {
    try {
        if (!_.isNil(preKey) && !_.isNil(destinationKey)) {
            await dynamoose.transaction([
                vus.transaction.update(
                    { partitionKey: preKey, sortKey: '#detail' },
                    { $SET: { currentLocation: false } }
                ),
                vus.transaction.update(
                    { partitionKey: destinationKey, sortKey: '#detail' },
                    { $SET: { currentLocation: true, updatedAt, locationIndex } }
                ),
            ]);
        } else if (!_.isNil(preKey)) {
            await vus.update(
                { partitionKey: preKey, sortKey: '#detail' },
                { $SET: { currentLocation: false } }
            );
        } else if (!_.isNil(destinationKey)) {
            await vus.update(
                { partitionKey: destinationKey, sortKey: '#detail' },
                { $SET: { currentLocation: true, updatedAt, locationIndex } }
            );
        }

        return { success: true, message: '위치 변경 성공', code: 204 };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = createDriverLocation;
