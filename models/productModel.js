let products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

// GET all products
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

// GET single product
function findByID(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id);
        resolve(product);
    })
}

// POST create a new product
function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(),...product}
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(newProduct);

    })
}

//PUT update a product
function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);
        products[index] = {id,...product};

        writeDataToFile('./data/products.json', products);
        resolve(products[index]);
    })
}

//DELETE delete a product
 function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id);

        writeDataToFile('./data/products.json', products);
        resolve();
    })
}

module.exports = {
    findAll,
    findByID,
    create,
    update,
    remove
}