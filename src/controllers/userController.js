const model = require('../models/user')

const show = async (req, res) => {

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