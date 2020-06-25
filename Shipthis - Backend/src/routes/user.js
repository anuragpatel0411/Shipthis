let express= require('express')
let router= express.Router()

// login
router.post('/login', async(req, resp)=>{
    if(!req.body){
        return resp.status(400).send('Parameters are missing..!')
    }
    console.log(req.body.username)
    if(req.body.username=='test' && req.body.password=='password'){
        var data={
            name: "Demo User",
            userId: "abcd"
        }
        resp.status(201).send(data)
    }else{
        resp.status(200).send(null);
    }
    
})

module.exports= router