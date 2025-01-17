const fs = require('fs')
const path = require('path')


let categorias = []

//CREATE
const create = (req, res) => {
    categorias = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../categorias.json'), 'utf-8'))
    res.render('categorias/create')
}

const store = (req, res) => {
    //los datos vienen el req.body, tengo que desestructurarlo de la siguiente forma

    const { nombre } = req.body

    if (!nombre) {
        return res.status(400).send('El nombre es obligatorio');
    }

    const nuevaCategoria = {
        id: categorias.length + 1,
        nombre,
    }

    categorias.push(nuevaCategoria)
    //esto es para guardar las categorias en un archivo, en este caso un JSON
    fs.writeFileSync(path.resolve(__dirname, '../../categorias.json'), JSON.stringify(categorias))
    
    res.redirect('/categorias')


}
//READ
const index = (req, res) => {

    categorias = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../categorias.json'), 'utf-8'))
    res.render('categorias/index', { categorias })
}
//read para uno solo
const show = (req, res) => {
    categorias = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../categorias.json'), 'utf-8'))

    const { id } = req.params

    const categoria = categorias.find((categoria) => categoria.id == Number(id))

    if (!categoria) {
        return res.status(404).send('La categoria No existe')

    }

    res.render('categorias/show', { categoria })
}

//UPDATE
const edit = (req, res) => {
    categorias = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../categorias.json'), 'utf-8'))

    const { id } = req.params

    const categoria = categorias.find((categoria) => categoria.id == Number(id))


    if (!categoria) {
        return res.status(404).send('La categoria No existe')

    }
    res.render('categorias/edit', { categoria })
}

const update = (req, res) => {
    categorias = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../categorias.json'), 'utf-8'))

    const { id } = req.params
    const { nombre } = req.body
    const categoria = categorias.find((categoria) => categoria.id == Number(id))


    if (!categoria) {
        return res.status(404).send('La categoria No existe')
    }
    categoria.nombre = nombre
    fs.writeFileSync(path.resolve(__dirname, '../../categorias.json'), JSON.stringify(categorias))
    res.redirect('/categorias')
}


//DELETE

const destroy = (req, res) => {
    categorias = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../categorias.json'), 'utf-8'))
    const { id } = req.params
    const index = categorias.findIndex((categoria) => categoria.id == id)
    if (index == -1) {
        return res.status(404).send('La categoria No existe')
    }

    categorias.splice(index, 1)

    fs.writeFileSync(path.resolve(__dirname, '../../categorias.json'), JSON.stringify(categorias))
    res.redirect('/categorias')
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