const vus = require('../../model/vus');

const updateApplyUser = async ({ partitionKey, sortKey, state }) => {
    try {
        await vus.update({ partitionKey, sortKey }, { $SET: { state: state } });
        return { success: true, message: 'update success', code: 204 };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = updateApplyUser;
