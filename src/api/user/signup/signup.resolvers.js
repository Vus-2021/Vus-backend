const { getSalt, getHashedPassword } = require('../../../modules/hash');

const { createUser, getUserById } = require('../../../services/user');

const resolvers = {
    Query: {
        dummy: () => {
            return { token: 'hello' };
        },
    },
    Mutation: {
        signupUser: async (_, args) => {
            const { userId, password, name, phoneNumber, type, registerDate } = args.input;
            const { success: alreadyUserId } = await getUserById({ userId });

            if (alreadyUserId) {
                return { success: false, message: 'alreadyUserId', code: 400 };
            }
            const salt = getSalt();
            const HashedPassword = await getHashedPassword(password, salt);
            const { success, message, code } = await createUser({
                userId,
                password: HashedPassword,
                salt,
                name,
                phoneNumber,
                type,
                registerDate,
            });

            if (!success) {
                return { success, message, code };
            }

            return { success, message, code };
        },
    },
};

module.exports = resolvers;
