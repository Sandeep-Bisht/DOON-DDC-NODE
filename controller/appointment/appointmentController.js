const connection = require("../../connection");
const nodemailer = require("nodemailer");
module.exports = {
  createAppointment: async (req, res) => {
    console.log("inside create appointment", req.body);
    const { name, email, contactNo, date, time, description } = req.body;

    const checkTableSql = 'SHOW TABLES LIKE "appointment"';
    connection.query(checkTableSql, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error checking for table existence");
      }
      if (results.length === 0) {
        const createTableSql =
          "CREATE TABLE appointment (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, email VARCHAR(50), contactNo VARCHAR(20), date VARCHAR(30), time VARCHAR(20), description VARCHAR(100), PRIMARY KEY (id))";
        connection.query(createTableSql, (error) => {
          if (error) {
            console.error(error);
            return res.status(500).send("Error creating table");
          }
          console.log("appointment table created!");
          insertData();
        });
      } else {
        insertData();
      }
    });

    function insertData() {
      const insertSql =
        "INSERT INTO appointment (name, email, contactNo, date, time, description) VALUES (?,?,?,?,?,?)";
      const values = [name, email, contactNo, date, time, description];
      connection.query(insertSql, values, async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error inserting data");
        }
        console.log("New user added to database!");

        // Send email to user
        const transporter = nodemailer.createTransport({
          host: "smtppro.zoho.com",
          port: 587,
          auth: {
            user: "info@doonddc.com",
            pass: "Doon@123",
          },
        });
        console.log("inside transporte");
        let adminEmail = "doonddc@gmail.com"

        var mailList = [email, adminEmail];

        const mailOptions = {
          from: "info@doonddc.com",
          to: mailList,
          subject: "Appointment Confirmation at Doon Digestive Care",
          text: `Hi ${name},\n\nYour appointment has been confirmed on ${date} ${time}. We look forward to seeing you soon!\n\nPlease arrive 15 minutes before the scheduled time to avoid confusion.\n\n Best regards,
          \nDoon Digestive Care\n+91-9997711444`,
        };
        try {
          await transporter.sendMail(mailOptions);
          console.log("Email sent to user!");
          res.status(200).send({
            status: 200,
            msg: "User added successfully!",
          });
        } catch (error) {
          console.error(error);
        }
      });
    }
  },

  getAllAppointment: async (req, res) => {
    console.log("inside get all appointment", req.body);

    connection.query("SELECT * FROM appointment", (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error Fetching data");
      }

      res
        .status(200)
        .send(`Data found successfully! ${JSON.stringify(results)}`);
    });
  },

  getSpecificDateAppointment: async (req, res) => {
    console.log("inside get specific date appointment", req.params);
    const { date } = req.params; // Assuming the date is sent as a parameter in the URL
    console.log(date, "dagteeeeeeeeeee")
  
    connection.query("SELECT * FROM appointment WHERE date = ?", [date], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error fetching data");
      }
      console.log
      res.status(200).send({
        msg : 'Data found successfully!',
        data : results,
        status: 200
      });
    });
  },
};
