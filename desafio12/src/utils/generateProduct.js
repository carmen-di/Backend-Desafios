import { faker } from "@faker-js/faker"

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        code: faker.string.uuid(),
        stock: faker.number.int(),
        category: faker.commerce.productAdjective(),
        id: faker.database.mongodbObjectId(),
        thumbnails: faker.image.url()
    }
}