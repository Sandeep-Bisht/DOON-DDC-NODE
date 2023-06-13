const connection = require("../../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  isUser: async (req, res) => {
    const { adminEmail, password } = req.body;
    const query = `SELECT * FROM registration WHERE adminEmail = '${adminEmail}'`;
    connection.query(query, adminEmail, async (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Somthing went wrong please try again");
      } else {
        if (result.length === 0) {
          return res.send({
            status: 403,
            msg: "No user Associated with this email",
          });
        } else {
          const user = result[0];
          const hashPassword = user.password;
          const enteredPassword = password;
          bcrypt.compare(
            enteredPassword,
            hashPassword,
            async (error, result) => {
              if (result) { 
                const payload = {
                    adminEmail : user.adminEmail,
                    password : user.password,
                    id : user.id
                } 
                const secretKey = "This is my Doo Digestive Care secret key"         
                const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
                return res.status(200).send({
                  status: 200,
                  msg: "User found",
                  data: user,
                  token: token,
                });
              } else {
                return res.status(200).send({
                  status: 401,
                  msg: "Invalid User",
                  data: error,
                });
              }
            }
          );
        }
      }
    });
  },
};
