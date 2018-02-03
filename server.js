const express = require ('express');
const hbs = require('hbs');
const fs = require ('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set ('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return 'Test' + new Date().getFullYear();  
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile ('server.log', log + '\r\n', (err) => {
        if (err) {
            console.log ('Unable to append to server.log');
        }
    })
    console.log (log);
    next();
});

// app.use((req, res, next) => {
//     res.render ('maintenance.hbs');
// })

app.use (express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send ('<h1>hello express</h1>');
    res.render ('home.hbs', {
        home: 'My Wonderful Node Page',
        title: 'My Home Page',
        welcome: 'Welcome to my Node Page',
        name: 'Santanu',
        likes: ['sleeping','reading','hacking till he is sore'],
        age: 'ancient',
    })
})

app.get ('/projects', (req, res) => {
    res.render ('projects.hbs', {
        home: 'My Projects',
        pageTitle: 'Projects Page',
    });
})



app.get ('/about', (req, res) => {
    res.render ('about.hbs', {
        home: 'My Wonderful Node Page',
        pageTitle: 'About Page',
    });
})

app.get ('/bad', (req, res) => {
    res.send ({
        errorMessage: 'Unable to handle request'}
    )
})

app.listen (port, () => {
    console.log (`server is up at port ${port}`);
});