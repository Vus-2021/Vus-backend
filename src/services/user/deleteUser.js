const vus = require('../../model/vus');

const deleteUsers = async ({ userList }) => {
    try {
        vus.batchDelete(userList, (err) => {
            if (err) return console.log(err);
        });
        return { success: true, message: '유저 삭제 성공', code: 204 };
    } catch (error) {
        return { success: false, message: '서버 에러', code: 500 };
    }
};

module.exports = deleteUsers;
