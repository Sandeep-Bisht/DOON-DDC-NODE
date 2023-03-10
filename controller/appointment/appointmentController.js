const connection = require("../../connection");
const nodemailer = require('nodemailer');
module.exports = {
    createAppointment : async (req, res) => {
        console.log("inside create appointment", req.body);
        const { name, email, phone } = req.body;
      
        const checkTableSql = 'SHOW TABLES LIKE "appointment"';
        connection.query(checkTableSql, (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).send('Error checking for table existence');
          }
          if (results.length === 0) {
            const createTableSql = 'CREATE TABLE appointment (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, email VARCHAR(50), phone VARCHAR(20), PRIMARY KEY (id))';
            connection.query(createTableSql, (error) => {
              if (error) {
                console.error(error);
                return res.status(500).send('Error creating table');
              }
              console.log('appointment table created!');
              insertData();
            });
          } else {
            insertData();
          }
        });
      
        function insertData() {
          const insertSql = 'INSERT INTO appointment (name, email, phone) VALUES (?, ?, ?)';
          const values = [name, email, phone];
      
          connection.query(insertSql, values, async (error, result) => {
            if (error) {
              console.error(error);
              return res.status(500).send('Error inserting data');
            }
            console.log('New user added to database!');
            res.status(200).send('User added successfully!');
            
            // Send email to user
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'sandeepbisht29@gmail.com',
                pass: 'spntawtjrzxkgwiq'
              }
            });
      
            const mailOptions = {
              from: 'sandeepbisht29@gmail.com',
              to: email,
              subject: 'Appointment Confirmation at Digestive Care',
              text: `Hi ${name},\n\nYour appointment has been confirmed. We look forward to seeing you soon!\n\nBest regards,\nDigestive Care`
            };
      
            try {
              await transporter.sendMail(mailOptions);
              console.log('Email sent to user!');
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
        return res.status(500).send('Error Fetching data');
      }
        
      res.status(200).send(`Data found successfully! ${JSON.stringify(results)}`);
    });
  },
};
