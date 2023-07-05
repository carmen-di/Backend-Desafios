import { usersDaoMongoose } from "../dao/mongo/users.dao.mongoose.js";
import { GenericRepository } from "./GenericRepository.js";

class UsersRepository extends GenericRepository {
    constructor(dao) { super(dao) }

    getUserByEmail = async (email) => {
        let result = await this.dao.findByEmail(email)
        return result
    }
    createUser = async (newUser) => {
        let result = await this.dao.create(newUser)
        return result
    }

}
export const usersRepository = new UsersRepository(usersDaoMongoose)