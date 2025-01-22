const model = require('../models/category')


//CREATE
const create = (req, res) => {
    //render de la vista
    res.render('categorias/create')
}

const store = (req, res) => {
    //los datos vienen el req.body, tengo que desestructurarlo de la siguiente forma
    const { name } = req.body
    //uso el modelo para conectar con la bbdd 
    model.create(name, (error, id) => {
        if (error) {
            return res.status(500).send('Internal Server Error.')
        }

        console.log(id)

        res.redirect('/categorias')
    })


}
//READ
const index = (req, res) => {

    model.findAll((error, categorias) => {
        if (error) {
            return res.status(500).send('Internal Server Error.')
        }
        res.render('categorias/index', { categorias })
    })

}

//read para uno solo
const show = (req, res) => {
    const { id } = req.params

    model.findById(id, (error, categoria) => {
        if (error) {
            return res.status(500).send('Internal Server Error.')
        }
        if (!categoria) {
            return res.status(404).send('La categoria No existe')
        }
        res.render('categorias/show', { categoria })
    })

}

//UPDATE
const edit = (req, res) => {

    const { id } = req.params

    model.findById(id, (error, categoria) => {
        if (error) {
            return res.status(500).send('Internal Server Error.')
        }
        if (!categoria) {
            return res.status(404).send('La categoria No existe')
        }
        res.render('categorias/edit', { categoria })
    })


}
const update = (req, res) => {

    const { id } = req.params
    const { name } = req.body

    model.update(id, name, (error, changes) => {
        if (error) {
            return res.status(500).send('Internal Server Error.')
        }
        // console.log(changes)
        res.redirect('/categorias')
    })

}


//DELETE

const destroy = (req, res) => {
    const { id } = req.params

    model.destroy(id, (error, changes) => {
        if (error) {
            return res.status(500).send('Internal Server Error.')
        }
        console.log(changes)
        res.redirect('/categorias')
    })


}


module.exports = {
    create,
    index,
    show,
    store,
    edit,
    update,
    destroy,
}