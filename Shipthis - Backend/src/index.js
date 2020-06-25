let express = require('express')
let app = express()
let blogRoute= require('./routes/blog')
let userRoute= require('./routes/user')

let path= require('path')
let bodyParser = require('body-parser')

// --------------------------------------------------------------------------------------------------------------------------------------------------------
//request headers
app.use(function(req, resp, next) {
    resp.header("Access-Control-Allow-Origin", "*")
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    // Request methods you wish to allow
    resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    next()
});
// --------------------------------------------------------------------------------------------------------------------------------------------------------

app.use(bodyParser.json())
app.use((req, resp, next) =>{
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    // resp.send('')
    next()
})

app.use(blogRoute)
app.use(userRoute)


//404 Not found Error Handler
app.use((req, resp) =>{
    resp.status(404).send('You are lost by- 404!')
})

//500 Error Handler
app.use((err, req, resp, next)=>{
    console.log(err.stack)
    resp.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server Has Started on ${PORT}`))