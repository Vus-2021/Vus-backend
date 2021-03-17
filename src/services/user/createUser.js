/* eslint-disable no-useless-catch */
const Dynamo = require('../../model/vus');

const createUser = async ({ userId, password, name, phoneNumber, group, registerDate }) => {
    try {
        console.log({ userId, password, name, phoneNumber, group, registerDate });
        const user = await new Dynamo({
            partitionKey: userId,
            sortKey: '#user',
            gsiSortKey: userId,
            password,
            name,
            phoneNumber,
            group,
            registerDate,
        }).save();
        console.log(user);
        return { result: 'success' };
    } catch (err) {
        return { result: 'fail', error: err };
    }
};

module.exports = createUser;
