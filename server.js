const express = require ('express');
const hbs = require('hbs');
const app = express();
const fs = require ('fs');

let treq;

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
        likes: ['sleeping','reading','hacking'],
        age: 'ancient',
        req: treq
    })
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

app.listen (3000, () => {
    console.log ('server is up at port 3000');
});