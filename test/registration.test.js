// const assert = require('assert')
// const pg = require("pg");
// const Pool = pg.Pool;


// const connectionString = process.env.DATABASE_URL || 'postgresql://bonisiwecukatha:pg123@localhost:5432/names_greeted';

// const Greet = require('../script');

// const pool = new Pool({
//     connectionString
// });


// describe('The greetings web app', function () {

//     beforeEach(async function () {
//         console.log("*****");
//         await pool.query("delete from users;");
       
//     });

   
    // it('should be able to greet Bonny correctly in  IsiXhosa', function () {
    //     var theGreet = Greet(pool);
    //     var word = "Bonny"
    //     var contain = "IsiXhosa"

    //     theGreet.greetings(contain, word)
       
    //     assert.equal("Molo, Bonny", theGreet.getMsg());