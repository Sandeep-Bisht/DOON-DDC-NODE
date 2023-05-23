const connection = require("../../connection");
const bcrypt = require("bcrypt");
module.exports = {
    adminRegistration : async (req, res) => {
        const { adminEmail, password} = req.body;
        console.log(adminEmail, "email", password, "password")

        const checkTable = 'SHOW TABLES LIKE "registration"';
        connection.query(checkTable, (error, result) => {
            if(error) {
                console.error(error);
                return res.status(500).send("Error while finding Table");
            }
            if(result.length === 0) {
               const  createRegistrationTable = 
               "CREATE TABLE registration (id INT NOT NULL AUTO_INCREMENT,adminEmail VARCHAR(50) NOT NULL,password VARCHAR(255) NOT NULL, PRIMARY KEY (id))";  
                connection.query(createRegistrationTable, (error) => {
                    if(error){
                        console.error(error);
                        return res.status(500).send("Error creating table");
                    }
                    console.log("registration table created!");
                    insertData();                    
                })
            } else {
                insertData();
            }
        })

        function insertData() {
            let saltRounds = 10;
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    const insertData = 
                    "INSERT INTO registration (adminEmail, password) VALUES (?,?)";
                    const values = [adminEmail, hash]
                    console.log("converted pass", hash)
                    connection.query(insertData, values, async(error, result) => {
                        if(error){
                            console.log(error);
                            return res.status(500).send("Error inserting data");
                        } else{
                            console.log("Admin registerd successfully")
                            return res.status(200).send({
                                status: 200,
                                msg:"admin created successfully"
                            })
                        }
                        
                    })
                });
              });
              
            
        }
    }
}