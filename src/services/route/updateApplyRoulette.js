const { updateArgument } = require('graphql-tools');
const vus = require('../../model/vus');

const updateApplyRolette = async ({ fulfilledKeys, rejectKeys }) => {
    try {
        for (let key of fulfilledKeys) {
            await vus.update(key, { $SET: { state: 'fulfilled' } });
        }
        for (let key of rejectKeys) {
            await vus.update(key, { $SET: { state: 'reject' } });
        }
        return { success: true, message: 'success update', code: 204 };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = updateApplyRolette;
