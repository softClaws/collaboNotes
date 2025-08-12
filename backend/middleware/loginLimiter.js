const rateLimit = require('express-rate-limit')
const {logEvents} = require('./logger')


const loginLimiter = rateLimit({
    windowMs: 60 * 1000, //1 min
    max: 5, //limits each IP to 5 login requests per window per minute
    message: {
        message: 'Too many login attempt from this IP, kindly wait a minute then try again!'
    },
    handler: (req, res, next, options) =>{
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false 
})

module.exports = loginLimiter