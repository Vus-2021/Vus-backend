const vus = require('../../model/vus');

const signin = async ({ userId }) => {
    try {
        const user = await vus.get({ partitionKey: userId, sortKey: '#user' });
        return { success: true, message: 'getUser', user };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = signin;
