const vus = require('../../model/vus');

const getBusApplicant = async ({ sortKey, gsiSortKey, index, condition }) => {
    try {
        let adminNotice;
        adminNotice = await vus
            .query('sortKey')
            .eq(sortKey)
            .where('gsiSortKey')
            .eq(gsiSortKey)
            .sort('descending')
            .using(index)
            .exec();

        if (condition) {
            adminNotice = await vus
                .query(condition)
                .where('sortKey')
                .eq(sortKey)
                .where('gsiSortKey')
                .eq(gsiSortKey)
                .sort('descending')
                .using(index)
                .exec();
        }

        return {
            success: true,
            message: 'Success get notice',
            code: 200,
            data: adminNotice,
        };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getBusApplicant;
