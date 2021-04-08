const vus = require('../../model/vus');

const get = async (args) => {
    try {
        const data = await vus.get(args);
        return { success: true, message: 'success crete ', code: 200, data };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = get;
