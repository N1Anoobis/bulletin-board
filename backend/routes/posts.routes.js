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
    console.log(req);
    const newPost = new Post({ ...req.body });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ messaage: err });
  }
});

// router.post('/posts/add', async (req, res) => {
//   try {
//     const { title, description, email } = req.fields;

//     console.log('req',req);
//     const validateData = (title, description, email) => {
    

//       const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   

//       let isValid = true;
//       if (!title && !description && !email) isValid = false;
//       else if (title.length < 10 && title.length > 50) isValid = false;
//       else if (description.length < 20) isValid = false;
//       else if (!validEmail.test(email)) isValid = false;

      

//       console.log('after validation', isValid);
//       return isValid;
//     };


 

//     if (req) {
//       const newPost = new Post({ ...req.fields });
//       await newPost.save();
//       res.json(newPost);
//     } else {
//       throw new Error('Wrong input!');
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;


