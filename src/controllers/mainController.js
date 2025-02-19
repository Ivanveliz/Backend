
const index = (req, res) => {
    res.render('layouts/main', {
        body: 'index',
        error: null

    });

}

module.exports = {
    index,

}