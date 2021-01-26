//Bring in the http node module. This is what express and other frameworks use under the hood
const http = require('http');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('./controllers/productController')

//The http object has a createServer method that kick starts everything.
//You can pass a function in that takes in a request and response
//writeHead will allow us to send the code in a header
const server = http.createServer((req, res) => {
    if(req.url === '/api/products' && req.method === 'GET'){
       getProducts(req, res)
    } else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method ==='GET') {
        const id = req.url.split('/')[3];
        getProduct(req, res, id);
    } else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateProduct(req, res, id);
    } else if(req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res);
    } else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deleteProduct(req, res, id);
    } else {
        res.writeHead(400, {'Content-Type':'application/json'});
        res.end(JSON.stringify({message : 'Route Not Found'}));
    }
})

//use process.env.PORT to check if there is an environment variable
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));