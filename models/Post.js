const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    postTitle : {
        type : String, 
        required : true
    },
    postContent : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Posts', PostSchema);