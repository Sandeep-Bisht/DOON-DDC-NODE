const express = require("express")
const bodyParser =require('body-parser')
const cors = require('cors');
const app = express();
require('dotenv').config()
const db = require("./connection")

const AppointmentRounter = require('./controller/appointment/appointmentRouting');
const RegistrationRouter = require("./controller/registration/registrationRouting");
const AuthanticationRouter = require('./controller/authantication/authanticationRouting');
const PatientRouter = require('./controller/patient/patientRouting');
const BlogRouter = require("./controller/blog/blogRouting");
const HolidayRouter = require('./controller/holiday/holidayRouting')
const ContactRouter = require('./controller/contactUs/contactusRouting')



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true }));

app.use('/api/appointment', AppointmentRounter);
app.use('/api/contactUs', ContactRouter);
app.use('/api/registration', RegistrationRouter)
app.use('/api/authantication', AuthanticationRouter);
app.use('/api/patient', PatientRouter),
app.use('/api/holidayList', HolidayRouter)
app.use('/api/public', express.static('public'));
app.use('/api/blog', BlogRouter)
app.get("/", (req,res) => {
    res.send("Server is running")
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port "+process.env.PORT)  
 
})
