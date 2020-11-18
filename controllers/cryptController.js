const fs = require('fs')
const cryptRouter = require('express').Router()

cryptRouter.get('/', (req, res) => {
    const rawCrypt = fs.readFileSync('./cryptids.json');
    const crypts = JSON.parse(rawCrypt)

    res.render('cryptids/index', { crypts })
})

cryptRouter.get('/new', (req,res) => {
    res.render('cryptids/new')
})

cryptRouter.get('/:id', (req, res) => {
    const rawCrypt = fs.readFileSync('./cryptids.json');
    const crypts = JSON.parse(rawCrypt)
    const id = parseInt(req.params.id) -1
    const crypt = crypts[id]

    res.render('cryptids/show', { crypt })
})

cryptRouter.post('/', (req, res) => {
    const newCrypt = req.body
    const rawCrypt = fs.readFileSync('./cryptids.json');
    const crypts = JSON.parse(rawCrypt)
    crypts.push(newCrypt)

    fs.writeFileSync('./cryptids.json', JSON.stringify(crypts));

    res.redirect('/cryptids');
})

module.exports = cryptRouter