const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({ status: 'published' })
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

    const validateData = (title, text, author) => {
      const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      let isValid = true;
      if (!title && !text && !author) isValid = false;
      else if (title.length < 10 && title.length > 20) isValid = false;
      else if (text.length < 20) isValid = false;
      else if (!validEmail.test(author)) isValid = false;
      return isValid;
    };
    if (validateData(title, text, author)) {
      const newPost = new Post({ ...req.body });
      await newPost.save();
      res.json(newPost);
    }
  } catch (err) {
    res.status(500).json({ messaage: err });
  }
});

module.exports = router;


