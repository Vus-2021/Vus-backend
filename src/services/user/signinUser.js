const vus = require('../../model/vus');

const signin = async ({ userId, hashedPassword }) => {
    try {
        const user = await vus.get({ partitionKey: userId, sortKey: '#user' });

        if (user.password !== hashedPassword) {
            return { success: false, message: 'not matched password', code: 400, user: null };
        }
        return { success: true, message: 'login success', code: 200, user };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = signin;
