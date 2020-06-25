let mongoose= require('mongoose')

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/shipthis", { useCreateIndex: true, useNewUrlParser: true });

let BlogSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
    },
    userId:{
        type: String,
        required: true
    },
    date: Date
})

module.exports= mongoose.model('blogs', BlogSchema   )