// Desafio 2

//const { log } = require('console');
import fs from "fs";
//const { title } = require('process');

export class ProductManager {
  constructor(path) {
    //this.products = [];
    manager.loadProductsFromDisk() = [];
    this.nextId = 1;
    this.path = path;
    console.log("Productos cargados");
    

  }

  //CARGAR LOS PRODUCTOS 
  async loadProductsFromDisk() {
    try {
      const data = await fs.readFile(this.path);
      //this.products = JSON.parse(data);
      manager.loadProductsFromDisk() = JSON.parse(data);
    } catch (error) {
      return []
    }
                           
  }

  //GUARDAR EN EL DISCO

  async saveProductsToDisk() {
    try {
      //const data = JSON.stringify(this.products);
      const data = JSON.stringify(manager.saveProductsToDisk());
      await fs.writeFile(this.path, data);
    } catch (error) { console.log("No se pudo guardar el archivo de productos"); }
  }


  //
  async addProduct(product) {
    if (!title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error('todos los campos son obligatorios');
      return;
    }

   

    //const lastProduct = this.products[this.products.length - 1];
    const lastProduct = manager.saveProductsToDisk()[manager.saveProductsToDisk().length - 1];
    let nextId = 1;
    if (lastProduct) {
      nextId = lastProduct.id + 1;
    }
    const newProduct = { id: nextId, ...product };
    manager.saveProductsToDisk().push(newProduct);
    await this.saveProductsToDisk();
    console.log("Producto agregado:", newProduct);
  }
  //
  async getProductById(id) {
    await this.loadProductsFromDisk();
    //const product = this.products.find(product => product.id === id);
    const product = manager.loadProductsFromDisk().find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.error('Not found');
      return null;
    }
  }
  //
  async getProducts() {
    await manager.loadProductsFromDisk();
    //return this.products;
    return manager.loadProductsFromDisk()
  }
  //
  isCodeDuplicate(code) {
    //return this.products.some(product => product.code === code);
    return manager.loadProductsFromDisk().some(product => product.code === code);
  }
  //
  async deleteProduct(id) {
    await this.loadProductsFromDisk();
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      return;
    }
    //this.products.splice(index, 1);
    manager.saveProductsToDisk().splice(index, 1);
    await this.saveProductsToDisk();
    console.log(`Producto con ID ${id} a sido eliminado`);
  }
  //
  async updateProduct(id, updatedFields) {
    await this.loadProductsFromDisk();
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




//declaro una funcion asincronica
const main = async () => {

  const manager= await new ProductManager("./productos.json");

  //utilizo await delante de todo metodo asincronico de mi clase
      await manager.addProduct({
      title: "Camiseta",
      description: "Caniseta de algodon",
      price: "20",
      thumbnail: "/path/to/thumbnail.jpg",
      code: "P0010000",
      stock: "10",
  });

  await manager.addProduct({
      title: "Pantalon",
      description: "Pantalon vaquero",
      price: "30",
      thumbnail:"/path/to/thumbnail2.jpg",
      code: "P002",
      stock: "5",
  });

  console.log("Todos los productos:", await manager.getProducts());

  console.log("Producto con ID 2:", await manager.getProductById(2));

  await manager.deleteProduct(1);

  //ir agregando y sacando métodos e ir revisando que ocurre con los productos
}

//llamo a la función para que sea ejecutada
main()




/*
(async function () {
  await manager.loadProductsFromDisk();
 */
