const connection = require("../../connection");
const nodemailer = require("nodemailer");
module.exports = {
  createAppointment: async (req, res) => {
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
          createPatientTable();
          // insertData();
        });
      } else {
        insertData();
      }
    });

    function createPatientTable() {
      const createTableSql =
        "CREATE TABLE patient (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, email VARCHAR(50) UNIQUE, contactNo VARCHAR(20),description VARCHAR(100), PRIMARY KEY (id))";
      connection.query(createTableSql, (error) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error creating patient table");
        }
        insertData();
      });
    }

    function insertData() {
      const insertSql =
        "INSERT INTO appointment (name, email, contactNo, date, time, description) VALUES (?,?,?,?,?,?)";
      const values = [name, email, contactNo, date, time, description];
      connection.query(insertSql, values, async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error inserting data");
        }

        // Check if patient exists in the patient table based on email
        const checkPatientSql = "SELECT * FROM patient WHERE email = ?";
        connection.query(checkPatientSql, [email], (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).send("Error checking patient existence");
          }
          if (results.length === 0) {
            // Insert patient into patient table
            const insertPatientSql =
              "INSERT INTO patient (name, email, contactNo, description) VALUES (?,?,?,?)";
            const patientValues = [name, email, contactNo, description];
            connection.query(
              insertPatientSql,
              patientValues,
              (error, result) => {
                if (error) {
                  console.error(error);
                  return res.status(500).send("Error inserting patient data");
                }
              }
            );
          }
        });

        // Send email to user
        const transporter = nodemailer.createTransport({
          host: "smtppro.zoho.com",
          port: 587,
          auth: {
            user: "info@doonddc.com",
            pass: "Doon@123",
          },
          tls: {
    rejectUnauthorized: false, // Add this line to disable certificate verification
  },
        });
        let adminEmail = "doonddc@gmail.com";

        var mailList = [email, adminEmail];

        const mailOptions = {
          from: "info@doonddc.com",
          to: mailList,
          subject: "Appointment Confirmation at  Digestive Disease Care",
          text: `Hi ${name},\n\nYour appointment has been confirmed on ${date} ${time}. We look forward to seeing you soon!\n\nPlease arrive 15 minutes before the scheduled time to avoid confusion.\n\n Best regards,
          \nDigestive Disease Care\n+91-7534863345`,
        };
        try {
          await transporter.sendMail(mailOptions);
          res.status(200).send({
            status: 200,
            msg: "Your Appointment has confirmed",
          });
        } catch (error) {
          console.error(error);
        }
      });
    }
  },

  getAllAppointment: async (req, res) => {

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
    const { date } = req.params; // Assuming the date is sent as a parameter in the URL

    connection.query(
      "SELECT * FROM appointment WHERE date = ?",
      [date],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error fetching data");
        }
        // console.log;
        res.status(200).send({
          msg: "Data found successfully!",
          data: results,
          status: 200,
        });
      }
    );
  },

  getSpecificPeriodDateAppointment: async (req, res) => {
    
    const { fromDate, tillDate } = req.params; // Assuming fromDate and toDate are sent as parameters in the URL

    connection.query(
      "SELECT * FROM appointment WHERE date BETWEEN ? AND ?",
      [fromDate, tillDate],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error fetching data");
        }
        res.status(200).send({
          msg: "Data found successfully!",
          data: results,
          status: 200,
        });
      }
    );
  },
 
  
  updateAppointment: async (req, res) => {
    const { id, consultation } = req.body;
  
    // Check if the consultation column already exists in the table
    connection.query("SHOW COLUMNS FROM appointment LIKE 'consultation';", (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update appointment" });
      }
  
      if (results.length === 0) {
        // Add the consultation column if it doesn't exist
        connection.query("ALTER TABLE appointment ADD COLUMN consultation varchar(50);", (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: "Failed to update appointment" });
          }
  
          // Update the specific entry with the given id
          updateConsultation(id, consultation, res);
        });
      } else {
        // Update the specific entry with the given id
        updateConsultation(id, consultation, res);
      }
    });
  }
  
  
  
};

function updateConsultation(id, consultation, res) {
  connection.query(
    `UPDATE appointment SET consultation = '${consultation}' WHERE id = ${id};`,
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update appointment" });
      }

      res.status(200).json({ message: "Appointment updated successfully" });
    }
  );
}
