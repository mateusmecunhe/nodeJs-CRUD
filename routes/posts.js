const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//gets back all posts
router.get('/', async (req, res) => {
    try{

        const posts = await Post.find();
        res.json(posts);

    } catch(err){

        res.json({message: err});

    }
    
});

//gets back specific post
router.get('/:postId', async (req, res) => {
    console.log(req.params.postId);
    try{     

        const post = await Post.findById(req.params.postId);
        res.json(post);

    } catch(err){

        res.json({message: err});

    }
});

//submits post
router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    post.save({w: 1})
    .then(data => {
        res.json(data)
    })
    .catch(err => res.json({message: err}));
});

//deletes post
router.delete('/:postId', async (req, res) => {
    try{     

        const post = await Post.remove({_id: req.params.postId});
        const allPosts = await Post.find();
        
        res.json(allPosts);

    } catch(err){

        res.json({message: err});

    }
});

//updates post
router.patch('/:postId', async (req, res) => {
    try{
        const post = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set : {title : req.body.title}
        })
            ;
        res.json(post);
    } catch(err){
        res.json({message: err})
    }

})


module.exports = router;
