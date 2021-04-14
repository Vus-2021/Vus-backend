const dayjs = require('dayjs');

const allPass = ({ result }) => {
    if (result.applicants.length === 0) {
        return result;
    }

    if (result.applicants.length < result.limitCount) {
        result.fulfilled = result.applicants;
        result.applicants = [];
    }
    return result;
};

const sortApplicants = ({ result, sortType }) => {
    result.applicants.sort((a, b) => {
        if (sortType === null) return b - a;
        else return b[sortType] - a[sortType];
    });

    return result;
};

const selectByRegisterDate = ({ result, month }) => {
    const dueDate = dayjs().subtract(month, 'month');
    const group = [];

    if (result.limitCount === 0 || result.applicants.length === 0) {
        return result;
    }
    result.applicants = result.applicants.filter((user) => {
        if (dayjs.duration(dueDate.diff(user.registerDate))['$ms'] <= 0) {
            group.push(user);
        }
        return dayjs.duration(dueDate.diff(user.registerDate))['$ms'] > 0;
    });

    if (result.applicants.length === 0) {
        result.fulfilled = group;
        result.limitCount = result.limitCount - group.length;
        return result;
    }

    group.sort((a, b) => {
        a = dayjs(a.registerDate);
        b = dayjs(b.registerDate);
        return b - a;
    });

    if (group.length <= result.limitCount) {
        result.fulfilled = group;
        result.limitCount -= group.length;
    } else if (group.length > result.limitCount) {
        result.fulfilled = group.slice(0, result.limitCount);
        result.reject = [...group.slice(result.limitCount, group.length), ...result.applicants];
        result.applicants = [];
        result.limitCount = 0;
    }
    return result;
};

const selectByPreNotPassengers = ({ result }) => {
    const group = [];

    if (result.limitCount === 0 || result.applicants.length === 0) {
        return result;
    }
    result.applicants = result.applicants.filter((applicant) => {
        if (applicant.previousMonthState === ('notApply' || 'reject')) {
            group.push(applicant);
        }
        return applicant.previousMonthState !== ('notApply' || 'reject');
    });
    if (group.length <= result.limitCount) {
        result.fulfilled = [...result.fulfilled, ...group];
        result.limitCount -= group.length;
    } else if (group.length > result.limitCount) {
        result.fulfilled = [...result.fulfilled, ...group.slice(0, result.limitCount)];
        result.reject = [...group.slice(result.limitCount, group.length), ...result.applicants];
        result.applicants = [];
        result.limitCount = 0;
    }
    return result;
};

const selectByQueue = ({ result }) => {
    for (let i = 0; i < result.limitCount; i++) {
        result.fulfilled.push(result.applicants.shift());
    }
    result.reject = [...result.reject, ...result.applicants];

    return result;
};

const applyRoulette = ({ applicants, limitCount }) => {
    let result = { fulfilled: [], reject: [], limitCount, applicants };

    result = allPass({ result });
    result = selectByRegisterDate({
        result,
        month: 3,
    });
    result = selectByPreNotPassengers({
        result,
    });
    result = selectByQueue({ result });

    return result;
};

module.exports = applyRoulette;
