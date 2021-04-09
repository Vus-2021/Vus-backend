const getUserByPk = require('../../../../services/user/getUserByPk');
const discountRegisterCount = require('../../../../services/route/discountRegisterCount');
const { deleteItem } = require('../../../../services/dynamoose');
/**
 *  #applyRoute 를 쿼리 => pk가 같은 친구들 찾고 -> 지우고
 *
 */
const resolvers = {
    Mutation: {
        deleteUser: async (parent, args, { user }) => {
            if (!user || user.type !== 'ADMIN') {
                return { success: false, message: 'access denied', code: 403 };
            }
            try {
                let list = [];
                for (let item of args.userId) {
                    let { data } = await getUserByPk({ partitionKey: item });
                    list.push(
                        ...data.map((dataItem) => {
                            return {
                                partitionKey: dataItem.partitionKey,
                                sortKey: dataItem.sortKey,
                                routes: dataItem.gsiSortKey,
                                busId: dataItem.busId,
                                month: dataItem.sortKey.split('#')[2],
                            };
                        })
                    );
                }
                const userList = list.map((item) => {
                    return {
                        partitionKey: item.partitionKey,
                        sortKey: item.sortKey,
                    };
                });
                const route = list
                    .filter((item) => item.sortKey !== '#user')
                    .map((item) => {
                        return {
                            partitionKey: item.busId,
                            sortKey: `#${item.month}`,
                        };
                    });
                console.log(route);
                for (let item of route) {
                    await discountRegisterCount({ primaryKey: item });
                }

                for (let user of userList) {
                    await deleteItem(user);
                }

                return { success: true, message: '삭제 성공', code: 204 };
            } catch (error) {
                return { success: false, message: 'Failed delete users', code: 500 };
            }
        },
    },
};

module.exports = resolvers;
