const vus = require('../../model/vus');

const updateDetailRoute = async ({ primaryKey, updateItem }) => {
    try {
        await vus.update(primaryKey, { $SET: updateItem });
        return { success: true, message: 'success update', code: 204 };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = updateDetailRoute;
