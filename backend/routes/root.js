const express = require('express')
const router = express.Router()
const path = require('path')

//^/$ - check for '/' in the beginning(^) or ending($) of the route
//or(|) check /index with optional(.html)
router.get('^/$|/index(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html')) //fine the index file in the given dir 


})
module.exports = router