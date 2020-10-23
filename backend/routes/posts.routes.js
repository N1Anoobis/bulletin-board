const express = require('express');
const router = express.Router();
const validateUserInput = require('../utils/validateUserInput.js');
const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find()
      .select('title author created updated status text')
      .sort({ created: -1 });
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/posts/add', async (req, res) => {
  try {
    const { title, text, author } = req.body;
    const fileName = req.body.photo.split('/').slice(-1)[0];
    
    if (validateUserInput(title, text, author)) {
      const newPost = new Post({ ...req.body, photo: fileName});
      await newPost.save();
      res.json(newPost);
    }
  } catch (err) {
    res.status(500).json({ messaage: err });
  }
});

router.put('/post/:id/edit', async (req, res) => {
  try {
    const { title, text, author } = req.body;

    if (validateUserInput(title, text, author)) {
      const editedPost = await Post.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { returnNewDocument: true });
      if (!editedPost) res.status(404).json({ post: 'Not found' });
      else res.json(editedPost);
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


