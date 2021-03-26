const dynamoose = require('dynamoose');
const validParameters = function ({ isMatched, ...args }) {
    let condition = new dynamoose.Condition();
    console.log({ ...args });
    const existedParameters = Object.entries({ ...args }).filter((value) => value[1] != undefined);

    for (let parameter of existedParameters) {
        let [key, value] = parameter;
        condition =
            isMatched === true
                ? condition.where(key).eq(value)
                : condition.where(key).contains(value);
    }

    if (condition.settings.conditions.length === 0) {
        return null;
    }
    return condition;
};
module.exports = validParameters;
