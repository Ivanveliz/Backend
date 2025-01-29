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

const show = async (req, res) => {
    console.log('ID recibido:', req.params.id);
    const { id } = req.params

    try {
        const producto = await model.findById(id)
        console.log(producto)
        if (!producto) {
            return res.status(404).send('Producto No encontrado')

        }
        res.render('productos/show', { producto })
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }

}

const edit = async (req, res) => {

    console.log('ID recibido:', req.params.id);
    const { id } = req.params

    try {
        const producto = await model.findById(id)
        console.log(producto)
        if (!producto) {
            return res.status(404).send('Producto No encontrado')

        }
        res.render('productos/edit', { producto })
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }

}
const update = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    try {
        const result = await model.update(id, name)
        res.redirect('/productos')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }

}


const destroy = async (req, res) => {
    const { id } = req.params
    try {
        const result = await model.destroy(id)
        res.redirect('/productos')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error')
    }

}
module.exports = {
    index,
    show,
    create,
    store,
    edit,
    update,
    destroy
}