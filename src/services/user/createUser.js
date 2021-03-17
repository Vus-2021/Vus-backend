/* eslint-disable no-useless-catch */
const Dynamo = require('../../model/vus');

const createUser = async ({ userId, password, name, phoneNumber, group, registerDate }) => {
    try {
        await new Dynamo({
            partitionKey: userId,
            sortKey: '#user',
            gsiSortKey: userId,
            password,
            name,
            phoneNumber,
            group,
            registerDate,
        }).save();
        return { success: true, message: '회원가입 성공' };
    } catch (err) {
        return { success: false, message: err.message };
    }
};

module.exports = createUser;
