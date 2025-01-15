const categorias = [
    
        {id: 1, nombre: 'Categoria 1'}, 
        {id: 2, nombre: 'Categoria 2'}, 
        {id: 3, nombre: 'Categoria 3'}, 
]



const index = (req, res) =>{
    res.render('categorias/index', {categorias})
}


module.exports = {
    index, 
}