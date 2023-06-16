// Desafio 2

//const { log } = require('console');
import fs from "fs";
//const { title } = require('process');

export class ProductManager {
  constructor(path) {
    this.products = [];
    this.nextId = 1;
    this.path = path;
    console.log("Productos cargados");
    

  }

  //CARGAR LOS PRODUCTOS 
  async loadProductsFromDisk() {
    try {
      const data = await fs.readFile(this.path);
      this.products = JSON.parse(data);
    } catch (error) {
      console.log("No se pudo leer el archivo de productos, se cargará un arreglo vacío");
      this.products = [];
      await fs.writeFile(this.path, `[]`);
    }
  }

  //GUARDAR EN EL DISCO

  async saveProductsToDisk() {
    try {
      const data = JSON.stringify(this.products);
      await fs.writeFile(this.path, data);
    } catch (error) { console.log("No se pudo guardar el archivo de productos"); }
  }


  //
  async addProduct(product) {
    if (!title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error('todos los campos son obligatorios');
      return;
    }

   

    const lastProduct = this.products[this.products.length - 1];
    let nextId = 1;
    if (lastProduct) {
      nextId = lastProduct.id + 1;
    }
    const newProduct = { id: nextId, ...product };
    this.products.push(newProduct);
    await this.saveProductsToDisk();
    console.log("Producto agregado:", newProduct);
  }
  //
  async getProductById(id) {
    await this.loadProductsFromDisk();
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.error('Not found');
      return null;
    }
  }
  //
  getProducts() {
    return this.products;
  }
  //
  isCodeDuplicate(code) {
    return this.products.some(product => product.code === code);
  }
  //
  async deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return;
    }
    this.products.splice(index, 1);
    await this.saveProductsToDisk();
    console.log(`Producto con ID ${id} a sido eliminado`);
  }
  //
  async updateProduct(id, updatedFields) {
    const product = await this.getProductById(id);
    if (!product) {
      return;
    }
    Object.keys(updatedFields).forEach((key) => {
      product[key] = updatedFields[key];
    });
    await this.saveProductsToDisk();
    console.log("Producto actualizado");
  }
}


const manager = new ProductManager("./productos.json");

(async function () {
  await manager.loadProductsFromDisk();
  manager.addProduct({
    title: "Camiseta",
    description: "Caniseta de algodon",
    price: "20",
    thumbnail: "/path/to/thumbnail.jpg",
    code: "P001",
    stock: "10",

  });
  manager.addProduct({
    title: "Pantalon",
    description: "Pantalon vaquero",
    price: "30",
    thumbnail: "/path/to/thumbnail2.jpg",
    code: "P002",
    stock: "5",

  });



  console.log("Todos los productos:", manager.getProducts());
  // Obtener un producto por su ID utilizando el método getProductById
  console.log("Producto con ID 2:", await manager.getProductById(2));
  // Eliminar un producto utilizando el método deleteProduct
  await manager.deleteProduct(1);
})();