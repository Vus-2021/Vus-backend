const vus = require('../../model/vus');

const createNotice = async (args) => {
    try {
        await new vus({
            ...args,
        }).save();

        return { success: true, message: 'success add month route', code: 201 };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = createNotice;
