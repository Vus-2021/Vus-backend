const vus = require('../../model/vus');

const getUserById = async ({ userId }) => {
    try {
        const user = await vus.get({ partitionKey: userId, sortKey: '#user' });

        if (!user) {
            return { success: false, message: 'invalid user', code: 400, user: null };
        }
        return { success: true, message: 'getUser', code: 200, user };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getUserById;
