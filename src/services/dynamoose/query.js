/* eslint-disable no-unused-vars */
const vus = require('../../model/vus');
const query = async function ({ condition, queryOptions }) {
    try {
        let query = vus.query(condition);

        if (queryOptions) {
            for (let [key, [value, method]] of Object.entries(queryOptions)) {
                query = query[method](value);
            }
        }
        const data = await query.exec();

        return {
            success: true,
            message: 'Success query',
            code: 200,
            data: data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
            code: 500,
        };
    }
};
module.exports = query;
