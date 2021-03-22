const vus = require('../../model/vus');

const getDriverNotice = async ({ sortKey, route, index, noticeType, gsiSortKey }) => {
    try {
        const driverNotice = await vus
            .query('sortKey')
            .eq(sortKey)
            .where('route')
            .eq(route)
            .where('noticeType')
            .eq(noticeType)
            .where('gsiSortKey')
            .beginsWith(gsiSortKey)
            .sort('ascending')
            .using(index)
            .exec();

        return { success: true, message: 'Success get drvier notice', data: driverNotice };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = getDriverNotice;
