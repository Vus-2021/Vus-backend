const vus = require('../../model/vus');

const getUserById = async ({ userId }) => {
    try {
        const user = await vus.get({ partitionKey: userId, sortKey: '#user' });

        if (!user) {
            return { success: false, message: 'invalid user', user: null };
        }
        return { success: true, message: 'getUser', user };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = getUserById;
