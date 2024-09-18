require('dotenv').config()
const express  = require('express')
const app = express()
const path = require('path')
const {logger, logEvents} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConnection')
const mongoose = require('mongoose')

const rootRoutes = require('./routes/root')
const userRoute = require('./routes/userRoutes')
const noteRoute = require('./routes/noteRoutes')

const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)
connectDB()

app.use(logger)
app.use(cors(corsOptions))
app.use(express.json()) //able to use json in the server
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public'))) //telling express where to look for static files
app.use('/', rootRoutes) //tell where to get the route file
app.use('/users',userRoute)
app.use('/notes',noteRoute)
app.all('*', (req,res) =>{
    res.status(404) //error status
    if(req.accepts('html')){ //for the case of non-existing html file
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if(req.accepts('json')){ //in the case of json file not routed properly
        res.json({message: '404 Not Found!'})

    }else{
        res.type('text').send('404 Not Found!')
    }
}) //throughout the routes in the project


app.use(errorHandler)
mongoose.connection.once('open', ()=>{
console.log('Connected to MongoDB')
// console.log("check!!!")

    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
})
mongoose.connection.on('error', err=>{
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongooseErrLog.log')
})