const vus = require('../../model/vus');
const dynamoose = require('dynamoose');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const _ = require('lodash');

const transaction = async (args) => {
    const transactionItem = [];
    const existedParameters = Object.entries(args).filter((value) => value[1] != undefined);
    for (let [method, transaction] of existedParameters) {
        for (let item of transaction) {
            switch (method) {
                case 'Put':
                    transactionItem.push();
                    break;
                case 'Delete':
                    if (_.isNil(item.primaryKey.partitionKey)) break;
                    transactionItem.push(vus.transaction.delete(item.primaryKey));
                    break;
                case 'Update':
                    if (_.isNil(item.primaryKey.partitionKey)) break;
                    transactionItem.push(
                        vus.transaction.update(item.primaryKey, {
                            [`$${item.method}`]: item.updateItem,
                        })
                    );
                    break;
            }
        }
    }

    try {
        await dynamoose.transaction(transactionItem);
        return { success: true, message: '성공', code: 204 };
    } catch (error) {
        return { success: false, message: error.message, code: 500 };
    }
};

module.exports = transaction;
