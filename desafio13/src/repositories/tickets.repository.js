import { ticketsDaoMongoose } from "../dao/mongo/tickets.dao.mongoose.js";
import { GenericRepository } from "./GenericRepository.js";

class TicketsRepository extends GenericRepository {
    constructor(dao) { super(dao) }
    createTicket = async (totalAmount, purchaser) => {
        await this.dao.createTicket(totalAmount, purchaser)
    }
}

export const ticketsRepository = new TicketsRepository(ticketsDaoMongoose)