/* eslint-disable no-useless-catch */
const vus = require('../../model/vus');

const createUser = async ({ userId, password, salt, name, phoneNumber, type, registerDate }) => {
    try {
        await new vus({
            partitionKey: userId,
            sortKey: '#user',
            gsiSortKey: `#registerDate#${registerDate}`,
            password,
            name,
            salt,
            phoneNumber,
            type,
        }).save();
        return { success: true, message: '회원가입 성공', code: 201 };
    } catch (err) {
        return { success: false, message: err.message, code: 500 };
    }
};

module.exports = createUser;
