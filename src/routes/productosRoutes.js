const express = require('express')

//modulo que ya viene para usar las query estas query me sirven para ordenar de maor a menor o traer por limite de productos
//generalemnte lo explican en la documentacion 
//este modulo querystring es nativo de node.
const querystring = require ('querystring')

const router = express.Router()

//trae todos los productos
router.get('/', (req, res) => {
    const query = querystring.stringify(req.query)

    fetch('https://fakestoreapi.com/products/' + query) 
            .then(res=>res.json())
            .then(productos=>res.json(productos))
})

//trae 1 producto con params
router.get('/:id', (req, res) => {
    fetch('https://fakestoreapi.com/products/' + req.params.id)
            .then(res=>res.json())
            .then(producto=>res.json(producto))
})


// trae un limite de producto con QUERYS

module.exports = router