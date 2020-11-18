//require stuff
const express = require('express')
const app = express()
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const cryptRouter = require('./controllers/cryptController');
const dinoRouter = require('./controllers/dinoController');

//additional setup
app.set('view engine', 'ejs')
app.use(layouts)
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))

//our routes
app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/dinosaurs', dinoRouter)

app.use('/cryptids', cryptRouter)


//listen
app.listen(8000, () => {
    console.log('server is alive');
})