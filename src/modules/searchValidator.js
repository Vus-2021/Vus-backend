const dynamoose = require('dynamoose');
const validParameters = function ({ isMatched, title, name, content, notice, route, month }) {
    let condition = new dynamoose.Condition();
    const existedParameters = Object.entries({ title, name, content, notice, route, month }).filter(
        (value) => value[1] != undefined
    );

    for (let parameter of existedParameters) {
        switch (parameter[0]) {
            case 'title':
                condition =
                    isMatched === true
                        ? condition.where('title').eq(title)
                        : condition.where('title').contains(title);
                break;
            case 'name':
                condition =
                    isMatched === true
                        ? condition.where('name').eq(name)
                        : condition.where('name').contains(name);
                break;
            case 'content':
                condition =
                    isMatched === true
                        ? condition.where('content').eq(content)
                        : condition.where('content').contains(content);
                break;
            case 'notice':
                condition =
                    isMatched === true
                        ? condition.where('notice').eq(notice)
                        : condition.where('notice').contains(notice);
                break;
            case 'route':
                condition =
                    isMatched === true
                        ? condition.where('route').eq(route)
                        : condition.where('route').contains(route);
                break;
            case 'month':
                condition =
                    isMatched === true
                        ? condition.where('month').eq(month)
                        : condition.where('month').contains(month);
                break;
        }
    }
    if (condition.settings.conditions.length === 0) {
        return null;
    }
    return condition;
};
module.exports = validParameters;
