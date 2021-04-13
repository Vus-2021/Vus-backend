require('dotenv').config();
module.exports = {
    dynamooseVus: require(`./${process.env.DB}Vus/create`),
    mongooseVus: require(`./${process.env.DB}Vus/deleteItem`),
};
