module.exports = function registration(pool) {


    var arr = []


    function show(reg) {

        arr.push(reg)

    }


    function showReg(reg) {

        return arr

    }



    async function regInput(regist) {

        try {


            let starts = regist.substring(0, 2)

            let ForeignKey = await getForeignKey(starts)
          
            let duplicates = await pool.query('SELECT  regnumber FROM registrations WHERE regnumber  =$1', [regist]);
            if (duplicates.rowCount === 0) {

                await pool.query('INSERT INTO  registrations(foreign_id,regnumber) VALUES ($1,$2)', [ForeignKey, regist]);
            }
          
            

        } catch (error) {
            console.log(`regInput function :==> ${error}`);
        }
    }

    async function getForeignKey(regStart) {

        let value = await pool.query('SELECT id FROM towns WHERE regstring = $1', [regStart]);

        return value.rows[0].id
    }

    async function displayRegistrations() {

        let registrationOutput = await pool.query('SELECT regnumber from registrations');

    
        return registrationOutput.rows
    }

    async function filterRegs(reg) {

        let start = reg.substring(0,2)
        let starts = await pool.query('SELECT regnumber FROM registrations WHERE  foreign_id = $1', [start]);
        console.log(starts + 'AFRICAAA')
        
        return starts.rows
    }

    async function resetBTn() {
        let reset = await pool.query('DELETE  FROM registrations');
        // return reset.rows;

    }



    return {
        regInput,
        getForeignKey,
        showReg,
        show,
        displayRegistrations,
        filterRegs,
        resetBTn
    }

}
