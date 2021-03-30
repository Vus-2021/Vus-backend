const vus = require('../../model/vus');

const discountRegisterCount = async ({ primaryKey }) => {
    try {
        await vus.update(primaryKey, { $ADD: { registerCount: -1 } });
        return { success: true, message: 'success update', code: 204 };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = discountRegisterCount;
