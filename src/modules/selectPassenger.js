const dayjs = require('dayjs');
const _ = require('lodash');

class SelectPassenger {
    constructor(limitCount, applicants, month, sortType) {
        this.fulfilled = [];
        this.reject = [];
        this.limitCount = limitCount;
        this.applicants = applicants;
        this.month = month;
        this.sortType = sortType;
    }
    allPass() {
        if (this.applicants.length === 0) {
            return this;
        }

        if (this.applicants.length < this.limitCount) {
            this.fulfilled = this.applicants;
            this.applicants = [];
        }
        return this;
    }
    sortPeople() {
        this.applicants.sort((a, b) => {
            if (_.isNil(this.sortType)) return b - a;
            else return b[this.sortType] - a[this.sortType];
        });
        return this;
    }

    selectByRegisterDate() {
        const dueDate = dayjs().subtract(this.month, 'month');
        const group = [];

        if (this.limitCount === 0 || this.applicants.length === 0) {
            return this;
        }
        this.applicants = this.applicants.filter((user) => {
            if (dayjs.duration(dueDate.diff(user.registerDate))['$ms'] <= 0) {
                group.push(user);
            }
            return dayjs.duration(dueDate.diff(user.registerDate))['$ms'] > 0;
        });

        if (this.applicants.length === 0) {
            this.fulfilled = group;
            this.limitCount = this.limitCount - group.length;
            return this;
        }

        group.sort((a, b) => {
            a = dayjs(a.registerDate);
            b = dayjs(b.registerDate);
            return b - a;
        });

        this.pick(group);
        return this;
    }
    selectByPreNotPassengers() {
        const group = [];

        if (this.limitCount === 0 || this.applicants.length === 0) {
            return this;
        }
        this.applicants = this.applicants.filter((applicant) => {
            if (applicant.previousMonthState === ('notApply' || 'reject')) {
                group.push(applicant);
            }
            return applicant.previousMonthState !== ('notApply' || 'reject');
        });
        this.pick(group);
        return this;
    }
    selectByRandomQueue() {
        const group = this.applicants;
        this.applicants = [];
        this.pick(group);
        return this;
    }
    pick(group) {
        if (group.length <= this.limitCount) {
            this.fulfilled = [...this.fulfilled, ...group];
            this.limitCount -= group.length;
        } else if (group.length > this.limitCount) {
            this.fulfilled = [...this.fulfilled, ...group.slice(0, this.limitCount)];
            this.reject = [...group.slice(this.limitCount, group.length), ...this.applicants];
            this.applicants = [];
            this.limitCount = 0;
        }
        return this;
    }
    getResult() {
        return this;
    }
}

const selectPassenger = ({ applicants, limitCount, methodList }) => {
    const month = 3;
    const sortType = null;
    let passengers = new SelectPassenger(limitCount, applicants, month, sortType);

    methodList.forEach((method) => {
        passengers = passengers[method]();
    });
    return passengers;
};

module.exports = selectPassenger;
