import { usersDaoMongoose, usersModel } from "../dao/mongo/users.dao.mongoose.js";
import { GenericRepository } from "./GenericRepository.js";

class UsersRepository extends GenericRepository {
    constructor(dao) { super(dao) }

    getUserByEmail = async (email) => {
        let result = await this.dao.findByEmail(email)
        return result
    }
    
    createUser = async (newUser) => {
        try {
            let result = await this.dao.create(newUser)
            return result 
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateUser(userId, updateFields) {
        return await this.dao.updateOne(userId, updateFields)
    }

}
export const usersRepository = new UsersRepository(usersDaoMongoose)