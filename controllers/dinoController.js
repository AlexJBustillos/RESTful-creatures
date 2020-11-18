const fs = require('fs')
const dinoRouter = require('express').Router()


dinoRouter.get('/', (req, res) => {
    const rawDinos = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(rawDinos)

    res.render('dinosaurs/index', { dinos })

})

//new has to be above show, or else it will think that 'new' is an id value
dinoRouter.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})

dinoRouter.get('/:id', (req, res) => {
    const rawDinos = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(rawDinos)
    const id = parseInt(req.params.id) -1
    const dino = dinos[id]

    res.render('dinosaurs/show', { dino })
})

dinoRouter.post('/', (req, res) => {
    const newDino = req.body
    const rawDinos = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(rawDinos)
    dinos.push(newDino)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));
    
    res.redirect('/dinosaurs');
})

dinoRouter.get('/search/:searchTerm', (req, res) => {
    const newDino = req.body
    const rawDinos = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(rawDinos)
    const searchTerm = req.params.searchTerm
    
    // note that the details of the search are up to you!
    //do partial matches count? do we look at the type property 
    const filteredDinos = dinos.filter((dino) => dino.name.toLowerCase() === searchTerm.toLowerCase())

    res.render('dinosaurs/index', { dinos: filteredDinos})
})

//edit route
dinoRouter.get('/edit/:id', (req, res) => {
    console.log('--- EDIT route ---');
    const rawDinos = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(rawDinos);
    res.render('dinosaurs/edit', { dino: dinos[req.params.id], dinoId: req.params.id})
})

dinoRouter.delete('/:id', (req, res) => {
    console.log('--- DELETE route ---');
    const rawDinos = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(rawDinos);

    //remove the deleted dino from the dinosaurs array
    dinos.splice(req.params.id, 1);

    //Save the new dinos to the dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));

    //redirect to the GET /dinosaurs route(index)
    res.redirect('/dinosaurs');
})

dinoRouter.put('/:id', (req, res) => {
    console.log('--- PUT route ---');
    const rawDinos = fs.readFileSync('./dinosaurs.json');
    const dinos = JSON.parse(rawDinos);

    // reassign the name and type of the dinosaurs fields to be edited
    const dinoObject = dinos[req.params.id]
    dinoObject.name = req.body.name;
    dinoObject.type = req.body.type;

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos));

    res.redirect('/dinosaurs');
})


module.exports = dinoRouter