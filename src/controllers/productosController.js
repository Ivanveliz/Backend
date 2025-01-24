//modulo que ya viene para usar las query estas query me sirven para ordenar de maor a menor o traer por limite de productos
//generalemnte lo explican en la documentacion 
//este modulo querystring es nativo de node.
const querystring = require('querystring')
const model = require('../models/product')

const create = (req, res) => {
    res.render('productos/create')
}

const store = async (req, res) => {
    const { name } = req.body

    try {
        const result = await model.store(name)
        console.log(result)
        res.redirect('/productos')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }

}

const index = async (req, res) => {
    try {
        const productos = await model.findAll()
        res.render('productos/index', { productos })

    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }
}

const show = (req, res) => {
    fetch('https://fakestoreapi.com/products/' + req.params.id)
        .then(res => res.json())
        .then(producto => res.json(producto))
}

module.exports = {
    index,
    show,
    create,
    store,
}