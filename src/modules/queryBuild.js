const dynamoose = require('dynamoose');
const queryBuild = function (args) {
    let condition = new dynamoose.Condition();
    const existedParameters = Object.entries(args).filter((value) => value[1][0] != undefined);
    for (let [key, [value, method]] of existedParameters) {
        switch (method) {
            case 'using' || 'sort':
                condition = condition[method](value);
                break;
            default:
                condition = condition.where(key)[method](value);
                break;
        }
    }

    if (condition.settings.conditions.length === 0) {
        return null;
    }
    return condition;
};
module.exports = queryBuild;
