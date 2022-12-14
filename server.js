import express from 'express';
import minimist from 'minimist';
import { roll } from './lib/roll.js';

const app = express();

app.use(express.urlencoded({extended: true}));

//get arguments from minimist
const args = minimist(process.argv.slice(2));

const port = args.port || 5000;

//response code added for /app endpoint
app.get('/app/', (req, res) => {
	res.send('200 OK');
});

//roll endpoint, but get
app.get('/app/roll/', (req, res) => {
	res.send(roll(6,2,1));
});

//different roll endpoint (post)
app.post('/app/roll/', (req, res) => {
	var sides = parseInt(req.body.sides, 10);
	var dice = parseInt(req.body.dice, 10);
	var rolls = parseInt(req.body.rolls, 10);
	res.send(roll(sides,dice,rolls));
});

//roll with sides
app.get('/app/roll/:sides/', (req, res) => {
	var sides = parseInt(req.params.sides, 10);
	res.send(roll(sides, 2, 1));
});

//roll with sides and dice
app.get('/app/roll/:sides/:dice/', (req, res) => {
	var sides = parseInt(req.params.sides, 10);
	var dice = parseInt(req.params.dice, 10);
	res.send(roll(sides, dice, 1));
});

app.get('/app/roll/:sides/:dice/:rolls/', (req, res) => {
	var sides = parseInt(req.params.sides, 10);
	var dice = parseInt(req.params.dice, 10);
	var rolls = parseInt(req.params.rolls, 10);

	//run the function that we imported
	res.send(roll(sides, dice, rolls));
});

app.use(function(req, res) {
	res.send("404 NOT FOUND");
});

app.listen(port);