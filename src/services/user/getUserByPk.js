const vus = require('../../model/vus');

const getUserById = async ({ partitionKey }) => {
    try {
        const data = await vus.query('partitionKey').eq(partitionKey).exec();

        return { success: true, message: 'getUser', code: 200, data };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = getUserById;
