const vus = require('../../model/vus');

const getUsers = async ({ sortKey, index, condition }) => {
    try {
        let users;
        users = await vus.query('sortKey').eq(sortKey).sort('descending').using(index).exec();

        if (condition) {
            users = await vus
                .query(condition)
                .where('sortKey')
                .eq(sortKey)
                .sort('descending')
                .using(index)
                .exec();
        }

        console.log(users);

        return {
            success: true,
            message: 'Success get users',
            code: 200,
            data: users,
        };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getUsers;
