const express = require('express')
const hbs = require('hbs')
const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //we have to tell express which folder to use for views if we want to customize it (anything other than views default name)
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //where we setup a setting to control our folder name/location of our views templates main folder
hbs.registerPartials(partialsPath) //registering partials path

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Matthew Hannon'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Matthew Hannon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text!',
        title: 'Help',
        name: 'Matthew Hannon'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(address,(error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error) {
                return console.log(error)
            }
            // console.log(forecastData)
            // console.log(location)
            res.send({
                forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    // console.log(req.query.search)
    res.send({
        products: []
    })
})

//you can get more specific 404 pages for paths
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found!',
        name: 'Matthew Hannon'
    })
})

//this has to be last of the gets
app.get('*', (req,res) => { //* MATCH ANYTHING THAT HASNT BEEN MATCHED SO FAR
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Matthew Hannon'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})