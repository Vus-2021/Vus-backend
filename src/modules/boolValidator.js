const dynamoose = require('dynamoose');
const boolValidParameters = function ({ condition, ...args }) {
    if (!condition) {
        condition = new dynamoose.Condition();
    }
    const existedParameters = Object.entries({ ...args }).filter((value) => value[1] != undefined);
    for (let [key, value] of existedParameters) {
        condition = condition.where(key).eq(value);
    }

    if (condition.settings.conditions.length === 0) {
        return null;
    }
    return condition;
};
module.exports = boolValidParameters;
