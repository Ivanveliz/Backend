//modulo que ya viene para usar las query estas query me sirven para ordenar de maor a menor o traer por limite de productos
//generalemnte lo explican en la documentacion 
//este modulo querystring es nativo de node.
const querystring = require ('querystring')

const index = (req, res) => {
    const query = querystring.stringify(req.query)

    fetch('https://fakestoreapi.com/products/' + query) 
            .then(res=>res.json())
            .then(productos=> 
                res.render('productos', {productos}) 
            )
}

const show = (req, res) => {
    fetch('https://fakestoreapi.com/products/' + req.params.id)
            .then(res=>res.json())
            .then(producto=>res.json(producto))
}

module.exports = {
    index: index, 
    show: show, 
}