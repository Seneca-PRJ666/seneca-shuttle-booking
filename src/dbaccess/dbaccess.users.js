import UserModel from "../models/models.users.js";


export default class UserDB{

    /**
     * Inserts one user in database.
     *
     * @param {Object} user
     * @param {String} user.username - This must be an email address.
     * @param {String} user.password - Password
     * @param {String} user.first_name - User first name
     * @param {String} user.last_name - User last name
     * @param {String} user.phone - User phone number
     * @returns {Promise<user>}
     */
    static async insertOne(user){
        try{
            let userInDb = new UserModel(user);
            await userInDb.save();
            userInDb = await UserModel.findOne({username:user.username});
            return userInDb;
        }
        catch (e) {
            throw e;
        }

    }

    static async findByUsername(username, fields){
        try{
            const user = await UserModel.findOne({username:username}, fields).exec();
            return user;
        }
        catch (e){
            throw e;
        }
    }
}