const connection = require("../../connection");
const nodemailer = require("nodemailer");
module.exports = {
  contactUs: async (req, res) => {
    const { name, email, contactNo, message } = req.body;
    return res.status(200).send("Form submitted successfully");

//     const checkTableSql = 'SHOW TABLES LIKE "appointment"';
//     connection.query(checkTableSql, (error, results) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).send("Error checking for table existence");
//       }
//       if (results.length === 0) {
//         const createTableSql =
//           "CREATE TABLE appointment (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, email VARCHAR(50), contactNo VARCHAR(20), date VARCHAR(30), time VARCHAR(20), description VARCHAR(100), PRIMARY KEY (id))";
//         connection.query(createTableSql, (error) => {
//           if (error) {
//             console.error(error);
//             return res.status(500).send("Error creating table");
//           }
//           createPatientTable();
//           // insertData();
//         });
//       } else {
//         insertData();
//       }
//     });

//     function createPatientTable() {
//       const createTableSql =
//         "CREATE TABLE patient (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, email VARCHAR(50) UNIQUE, contactNo VARCHAR(20),description VARCHAR(100), PRIMARY KEY (id))";
//       connection.query(createTableSql, (error) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).send("Error creating patient table");
//         }
//         insertData();
//       });
//     }

//     function insertData() {
//       const insertSql =
//         "INSERT INTO appointment (name, email, contactNo, date, time, description) VALUES (?,?,?,?,?,?)";
//       const values = [name, email, contactNo, date, time, description];
//       connection.query(insertSql, values, async (error, result) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).send("Error inserting data");
//         }

//         // Check if patient exists in the patient table based on email
//         const checkPatientSql = "SELECT * FROM patient WHERE email = ?";
//         connection.query(checkPatientSql, [email], (error, results) => {
//           if (error) {
//             console.error(error);
//             return res.status(500).send("Error checking patient existence");
//           }
//           if (results.length === 0) {
//             // Insert patient into patient table
//             const insertPatientSql =
//               "INSERT INTO patient (name, email, contactNo, description) VALUES (?,?,?,?)";
//             const patientValues = [name, email, contactNo, description];
//             connection.query(
//               insertPatientSql,
//               patientValues,
//               (error, result) => {
//                 if (error) {
//                   console.error(error);
//                   return res.status(500).send("Error inserting patient data");
//                 }
//               }
//             );
//           }
//         });

//         // Send email to user
//         const transporter = nodemailer.createTransport({
//           host: "smtppro.zoho.com",
//           port: 587,
//           auth: {
//             user: "info@doonddc.com",
//             pass: "Doon@123",
//           },
//           tls: {
//     rejectUnauthorized: false, // Add this line to disable certificate verification
//   },
//         });
//         let adminEmail = "doonddc@gmail.com";

//         var mailList = [email, adminEmail];

//         const mailOptions = {
//           from: "info@doonddc.com",
//           to: mailList,
//           subject: "Appointment Confirmation at  Digestive Disease Care",
//           text: `Hi ${name},\n\nYour appointment has been confirmed on ${date} ${time}. We look forward to seeing you soon!\n\nPlease arrive 15 minutes before the scheduled time to avoid confusion.\n\n Best regards,
//           \nDigestive Disease Care\n+91-7534863345`,
//         };
//         try {
//           await transporter.sendMail(mailOptions);
//           res.status(200).send({
//             status: 200,
//             msg: "Your Appointment has confirmed",
//           });
//         } catch (error) {
//           console.error(error);
//         }
//       });
//     }
  }
}