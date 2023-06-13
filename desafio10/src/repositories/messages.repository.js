import { messagesDaoMongoose } from "../dao/mongo/chat.dao.mongoose.js";
import { GenericRepository } from "./GenericRepository.js";

export const messagesRepository = new GenericRepository(messagesDaoMongoose)