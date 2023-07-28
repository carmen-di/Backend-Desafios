export class GenericRepository {
    #dao
    constructor(dao) {
        this.#dao = dao
    }
    
    get dao() { return this.#dao }
    
    create(data, options) {
        try {
            return this.#dao.create(data)
        } catch (error) {
            throw new Error(error)
        }
    }
    
    obtenerTodos() {
        return this.#dao.getAll()
    }
    
    obtenerSegunId(id) {
        return this.#dao.getById(id)
    }
    
    obtenerSegunIdPop(id) {
        return this.#dao.getByIdWithPopulate(id)
    }
    
    async borrarSegunId(id) {
        return this.#dao.deleteById(id)
    }
    
    readOne(criteria, options) {
        return this.#dao.readOne(criteria)
    }
    
    readMany(criteria, options) {
        return this.#dao.readMany(criteria)
    }
    
    updateOne(criteria, newData, options) {
        return this.#dao.updateOne(criteria, newData)
    }
    
    updateMany(criteria, newData, options) {
        return this.#dao.updateMany(criteria, newData)
    }
    
    deleteOne(criteria, options) {
        return this.#dao.deleteOne(criteria)
    }
    
    deleteMany(criteria, options) {
        return this.#dao.deleteMany(criteria)
    }

    updateUserPassword(user, newPassword) {
        return this.#dao.updateOne({ email: user }, { $set: { password: newPassword } })
    }
    
    async updatePassword(email, newPassword) {
        return await this.#dao.updateOne({ email: email }, { $set: { password: newPassword } })
    }

}