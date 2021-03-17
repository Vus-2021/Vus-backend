const vus = require('../../model/vus');

const signin = async ({ userId, password }) => {
    try {
        const user = await vus.get({ partitionKey: userId, sortKey: '#user' });
        if (user.password !== password) {
            return { success: false, message: 'not matched password' };
        }
        return { success: true, message: 'login success', user };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = signin;
