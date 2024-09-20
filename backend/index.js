const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const dashboardRoute = require('./routes/dashboard')
const handleAdminLogin = require('./controllers/handleAdminLogin')
const handleAdminLogout = require('./controllers/handleAdminLogOut')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const verifyToken = require('./middleware/verifyToken')
const handleCreateAdmin = require('./controllers/handleCreateAdmin')
const handleAdminPasswordReset = require('./controllers/handleAdminPasswordReset')
const handleDeleteAdmin = require('./controllers/handleDeleteAdmin')
const handleEditAdmin = require('./controllers/handleEditAdmin')


//Global variables
const PORT = process.env.PORT || 3000;
const app = express()

//Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
})); 
app.use(express.urlencoded({extended: true})) // for normal from data
app.use(bodyParser.json()) // For json data
app.use(cookieParser()); // Cookie parser
app.use((req, res, next) => {
    console.log(`Received request for ${req.url}`)
    // console.log(`Req body of ${req.url}  `, req.body)
    next();
}) // for logs



//Routes in route folder
app.use('/dashboard', dashboardRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//admin routes
app.post('/adminLogin', handleAdminLogin)
app.post('/adminLogout', handleAdminLogout)
app.post('/verifyToken',verifyToken,  (req, res) => {
    res.status(200).json({/**returns admin email address in req body */
        error: false,
        msg: "Token is valid",
        admin: req.body.admin
    })
})
app.post('/create-admin', verifyToken, handleCreateAdmin)
app.post('/password-reset', handleAdminPasswordReset)
app.delete('/admin-delete', verifyToken, handleDeleteAdmin)
app.put('/edit-admin', verifyToken, handleEditAdmin)
 

//Listeners
app.listen(PORT, () => {
    console.log(`Server listening at PORT:${PORT}`)
})





