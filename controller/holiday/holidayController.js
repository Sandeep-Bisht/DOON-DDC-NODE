const connection = require('../../connection');
module.exports = {
    markRoutineHoliday : async (req, res) => {
        console.log("inside mark holiday");
        const {date, reason} = req.body

        connection.query(`INSERT INTO holiday (date, reason) VALUES ('${date}', '${reason}')`, (error, results) => {
            if(error){
                console.error(error);
                return res.status(500).json({ error: "Failed to mark holiday" });
            }
            res.status(200).json({ message: "Holiday marked successfully" });
        })
    },
    getAllHolidayList : async (req, res) => {
        console.log("inside get All Holoiday list")
        connection.query("SELECT * FROM holiday", (error, results) => {
            if(error){
                return res.status(500).send("Error Fetching data")
            }

            res.status(200).send({
                msg : "Data found successfully!",
                data :  results,
            })
        })

    },
    getUpcomingHolidayList : async (req, res) => {
        console.log("inside upcoming holiday list")
        const { date } = req.query;
        console.log(date, "date")
  
        const query = "SELECT * FROM holiday WHERE date >= ?";
        
        connection.query(query, [date], (error, results) => {
          if (error) {
            console.error('Error fetching holiday list:', error);
            return res.status(500).send("Error fetching data");
          }
      
          res.status(200).send({
            msg: "Data found successfully!",
            data: results,
          });
        });
    }
        
}