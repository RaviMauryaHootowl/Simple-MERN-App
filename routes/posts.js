const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort('-date');
        res.json(posts);
    } catch (error) {
        res.json({"message" : error});
    }
});


router.post('/', async (req, res) => {
    //console.log(req);
    try {
        const newPost = new Post({
            postTitle : req.body.postTitle,
            postContent : req.body.postContent
        })
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (error) {
        res.json({"message" : error});
    }
});

router.patch('/:postId', async (req, res) => {
    const updatedPost = await Post.updateOne({_id : req.params.postId}, { $set : {
        postTitle : req.body.postTitle,
        postContent : req.body.postContent       
    }})
    res.json(updatedPost);
})

router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({_id : req.params.postId})
        res.json({"success" : true});
    } catch (err) {
        res.json({"success" : false});
    }
});

module.exports = router;