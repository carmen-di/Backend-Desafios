import fs from 'fs'

export class fileManager {
    #path
    
    constructor(path) {
      this.#path = path;
      this.productos = []
    }

    async read() {
      const json = await fs.promises.readFile(this.#path, 'utf-8')
      this.productos = JSON.parse(json)
     }

    async write() {
      const newProduct = JSON.stringify(this.productos, null, 2)
      await fs.promises.writeFile(this.#path, newProduct)
    }
  
    async resetDataFile() {
      await fs.promises.writeFile(this.#path, '[]')
    }
}