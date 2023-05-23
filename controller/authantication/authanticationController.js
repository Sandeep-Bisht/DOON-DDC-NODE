const connection = require("../../connection");
const bcrypt = require("bcrypt");

module.exports = {
  isUser: async (req, res) => {
    console.log("inside authantication is user");
    const { adminEmail, password } = req.body;
    const query = `SELECT * FROM registration WHERE adminEmail = '${adminEmail}'`;
    connection.query(query, adminEmail, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Somthing went wrong please try again");
      } else {
        if (result.length === 0) {
          console.log(result, "result");
          return res.send({
            status: 403,
            msg: "No user Associated with this email",
          });
        } else {
          const user = result[0];
          console.log("iuserrrrrrrrrrrrrrrrr", user)
          const hashPassword = user.password;
          const enteredPassword = password;

          console.log("result", hashPassword, "error", enteredPassword)

          bcrypt.compare(enteredPassword, hashPassword, (error, result) => {            
            if (result) {
              return res.status(200).send({
                status: 200,
                msg: "User found",
                data: user,
              });
            } else {
              return res.status(200).send({
                status: 401,
                msg: "Invalid User",
                data: error,
              });
            }
          });
        }
      }
    });
  },
};
