const db = require('../models/index');
const { User } = db;

class UserRespository{

    async create(userData, transaction){
        try{
            // user creation within the transaction
            return await User.create(userData, {transaction});
        }catch(error){
            throw new Error(error)
        }
    }
}

module.exports = new UserRespository();

