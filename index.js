'use strict';

const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const registraton = require('./script');
const app = express();

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://bonisiwecukatha:pg123@localhost:5432/registrationdb',
    ssl: { rejectUnauthorized: false }

    // ssl: {
    //     useSSL,
    //     rejectUnauthorized: false
    // }
});


const theRegistration = registraton(pool);
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());




var inputPatOne = /^((CA|CAM|CY)\s([0-9]){5})$/i;
var inputPatTwo = /^((CA|CAM|CY)\s\d{3})$/i;
var inputPatThree = /^((CA|CAM|CY)-\d{3})$/i;


app.get('/', async function (req, res) {


    res.render('index', {
        displayRegs: await theRegistration.displayRegistrations()
       
    })



});










app.post('/index', async function (req, res) {
    try {
        let inputField = req.body.nameInput;
        let addBTN = req.body.addBTN;

        if(inputField === "" ){
            req.flash('info', 'Please enter a registration number.');
        // }
        // else if (!inputPatOne.test(inputField) || !inputPatTwo.test(inputField) || !inputPatThree.test(inputField)) {
        //     req.flash('info', 'Please enter the registration in a correct format.');
        }else
        await theRegistration.regInput(inputField)
        res.redirect('/')

    } catch (error) {
        console.log(error);
    }

})



app.post('/reg_numbers', async function (req, res) {
let radio = req.body.town
   let displayRegs = await theRegistration.filterRegs(radio)



    res.redirect('index ',{showRegs:displayRegs})

});


app.post('/reg_numbers', function (req, res) {

    res.redirect('/')



});
app.post('/reset', async function (req, res){
    let clear = await theRegistration.resetBTn()
    res.render('index',{clear})
});











const PORT = process.env.PORT || 2013;

app.listen(PORT, function () {
    console.log("app started at", PORT)
});























