let BlogModel= require('../models/blog.model')
let express= require('express')
let router= express.Router()

//add blog
router.post('/add-blog', async(req, resp)=>{
    if(!req.body){
        return resp.status(400).send('Parameters are missing..!')
    }
    let model= new BlogModel(req.body)
    model.save()
        .then(data=> {
            if(!data || data.length === 0)
                return resp.status(500).send(data)
            resp.status(201).send(201)
        })
        .catch(err=>{
            resp.status(500).json(err)
            
        })
    
})

//get all blogs
router.get('/get-blog', async(req, resp)=>{
    if(!req.query.userId){
        return resp.status(400).send('Parameters are missing..!')
    }
    BlogModel.find({
            userId: req.query.userId,
        }).sort({"date":-1}).then(doc=>{
            resp.json(doc)
        })
        .catch(err=>{
            resp.status(500).json(err)
        })
})

//delete blog
router.delete('/delete-blog', (req, resp)=> { 
    if(!req.query._id){
        return resp.status(400).send('Missing Url Parameter')
    }
    console.log('eq.query._id')
    console.log(req.query._id)

    BlogModel.findOneAndRemove({
        _id: req.query._id
    })
        .then(doc=>{
            resp.json(doc)
        })
        .catch(err=>{
            resp.status(500).json(err)
        })
})

//update blog
router.put('/update-blog', async(req, resp)=>{
    if(!req.body){
        return resp.status(400).send('Parameters are missing..!')
    }
    BlogModel.update({
        _id: req.body._id
    },{
        $set: {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        }
    })
        .then(doc=>{
            resp.json(doc)
        })
        .catch(err=>{
            resp.status(500).json(err)
        })
})

module.exports= router