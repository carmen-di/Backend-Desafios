import { Router } from "express";
import usersModel from "../dao/mongo/models/user.schema.js";

export const registerRouter = Router();

registerRouter.get('/', (req, res) => {
    res.render('registro', {});
})

registerRouter.post('/', async (req, res) => {
    const { firstName, lastName, email, password, age } = req.body;
    try {
        const response = await usersModel.create({ firstName, lastName, email, password, age });
        res.status(200).send({message: 'success', payload: response});
    } catch (error) {
        res.status(500).send(error.message);
    }
})