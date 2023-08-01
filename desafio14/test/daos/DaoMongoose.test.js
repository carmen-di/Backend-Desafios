import mongoose from "mongoose"
import { DaoMongoose } from "../../src/dao/mongo/DaoMongoose.js"
//import assert from "node:assert"

const testSchema = new mongoose.Schema({
    property1: { type: String, required: true },
    property2: { type: Number, required: true }
});

const testModel = mongoose.model("tests", testSchema);

const testData = {
    property1: 'un nombre',
    property2: 1
}  

describe('dao mongoose', () => {
    describe('create', () => {
        describe('cuando llamo al create con un objeto con el esquema correspondiente', () => {
            it('devuelve el mismo objeto sin agregarle ningun campo ni metodos', async () => {
                const dao = new DaoMongoose(testModel)
                const pojo = await dao.create(testData)
            })
        })
    })
})