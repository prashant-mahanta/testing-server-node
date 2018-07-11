const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partial');// to Register a middleware
app.set('view engine', 'hbs');



// This middleware is for tracting log of server
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to log data to servers .......');
		}
	});
	console.log(log);
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getcurrentYear', () => {
	return  new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});
//setup a handler for root page
app.get('/', (req, res) => {
	// res.send('hello Express! ');
	// res.send({
	// 	name: 'Prashant',
	// 	marks: {
	// 		maths: 90,
	// 		english: 98,
	// 		hindi: 98
	// 	}
	// });

	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my Home Page',
		currentYear: new Date().getFullYear()
	});
});


app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: "About Page",
		currentYear: new Date().getFullYear()
	});
});

app.listen(port, () => {
	console.log(`Server running in port no ${port}`);
});
