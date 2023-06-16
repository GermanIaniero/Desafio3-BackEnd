import express from 'express';
import  "./ProductManager.js";

const productManager = new ProductManager();
const app = express()
app.use(express.json())

//let products = []

let products = products2

app.get('/products', async function (req, res)  {
    try {  
    
        res.json(products)

        let limit = req.query.limit;

        let products = await Product.findAll().paginate({limit: limit}).exec();

        res.render('index', {
            products: products
        });
    } catch(error) {
            res.status(500).end(error);
     }


})


app.get('/products/:pid', (req, res) => {
    res.json(products)

    const id = parseInt(req.params.id)
    const product = req.body

    const productIdx = products.findIndex(p => p.id === id)
    if(productIdx < 0) {
        return res.status(404).json({status: "error", message: 'Product not found'})
    }

    products[productIdx] = product

    res.json({status: 'success', message: 'Product actualizado'})
})



app.listen(8080)