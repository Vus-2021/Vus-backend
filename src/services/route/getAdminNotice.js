const vus = require('../../model/vus');

const getAdminNotice = async ({ sortKey, index, noticeType }) => {
    try {
        const adminNotice = await vus
            .query('sortKey')
            .eq(sortKey)
            .where('noticeType')
            .eq(noticeType)
            .sort('descending')
            .using(index)
            .exec();

        return {
            success: true,
            message: 'Success get drvier notice',
            code: 200,
            data: adminNotice,
        };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getAdminNotice;
