const vus = require('../../model/vus');

const getUserApply = async ({ sortKey, gsiSortKey }) => {
    try {
        const result = await vus
            .query('sortKey')
            .eq(sortKey)
            .where('gsiSortKey')
            .eq(gsiSortKey)
            .using('sk-index')
            .exec();

        return { success: true, message: 'getRoute', code: 200, result };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getUserApply;
