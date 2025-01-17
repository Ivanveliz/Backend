document.addEventListener('submit', (event) => {

  event.preventDefault()

    if(event.target.classList.contains('delete-form')){
        if(confirm('Está Seguro de que quiere borrar una categoría?')){
            event.target.submit()
        }
    }
})