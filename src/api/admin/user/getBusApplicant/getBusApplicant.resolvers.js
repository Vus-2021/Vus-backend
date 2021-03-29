const dayjs = require('dayjs');

const searchValidator = require('../../../../modules/searchValidator');
const getBusApplicant = require('../../../../services/user/getBusApplicant');
const getUserById = require('../../../../services/user/getUserById');

const resolvers = {
    Query: {
        getBusApplicant: async (parent, args, { user }) => {
            if (!user || user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            const { isMatched, route, name, month } = {
                isMatched: args.isMatched || false,
                gsiSortKey: args.route || '강남',
                name: args.name,
                month: args.month || dayjs(new Date()).format('YYYY-MM'),
            };
            let condition = searchValidator({ isMatched, route, name });
            try {
                const { success, message, code, data: monthResult } = await getBusApplicant({
                    sortKey: `#applyRoute#${month}`,
                    index: 'sk-index',
                    condition,
                });
                const userIdList = monthResult.map((applicant) => applicant.partitionKey);
                const userMap = new Map();

                monthResult.forEach((info) => {
                    userMap.set(info.partitionKey, {
                        applicant: {
                            route: info.gsiSortKey,
                            previousMonthState: info.previousMonthState,
                            state: info.state,
                            isCancellation: info.isCancellation,
                        },
                    });
                });

                let users = [];
                for (let userId of userIdList) {
                    let user = await getUserById({
                        partitionKey: userId,
                        sortKey: '#user',
                    });
                    users.push(user.user);
                }
                users.forEach((user) => {
                    userMap.get(user.partitionKey).user = {
                        name: user.name,
                        registerDate: user.gsiSortKey.split('#')[2],
                        type: user.type,
                        userId: user.partitionKey,
                        phoneNumber: user.phoneNumber,
                    };
                });

                const data = [...userMap.values()];
                return { success, message, code, data };
            } catch (error) {
                return { success: false, message: error.message, code: 500 };
            }
        },
    },
};

module.exports = resolvers;
