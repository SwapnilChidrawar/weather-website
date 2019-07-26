const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || '3000';

const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static('public'));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Swapnil Chidrawar empty'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Swapnil Chidrawar About'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        forecast: '50 degree',
        title: 'Help',
        helpText: 'This is a help page',
        name: 'Swapnil Chidrawar'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({
                error: error
            })
        } 
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error: error
                })
            } 
            res.send({
                location: location,
                forecast: forecast
            });
        });
    
    });
}); 

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: 'Page Not Found',
        name: 'Swapnil Chidrawar'
    })
});

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: 'Page Not Found',
        name: 'Swapnil Chidrawar'
    });
});

app.listen(port, () => {
    console.log('Web Server is listing on 3000 port...')
});