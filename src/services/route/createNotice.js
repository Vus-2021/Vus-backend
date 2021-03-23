const vus = require('../../model/vus');

const createNotice = async (args) => {
    try {
        await new vus({
            ...args,
        }).save();

        return { success: true, message: 'success crete notice' };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.message };
    }
};

module.exports = createNotice;
