const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// @route   POST /api/votes/upvote/:slug
// @desc    Increase upVotes for a post by slug
// @access  Public
router.post('/upvote/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    // Find the post by slug and increment upVotes
    const post = await Post.findOneAndUpdate(
      { slug: slug },
      { $inc: { upVotes: 1 } },
      { new: true } // Return the updated document
    );

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Return the updated post or just the new vote count
    res.json({
      slug: post.slug,
      upVotes: post.upVotes,
      downVotes: post.downVotes
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/votes/downvote/:slug
// @desc    Increase downVotes for a post by slug
// @access  Public
router.post('/downvote/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    // Find the post by slug and increment downVotes
    const post = await Post.findOneAndUpdate(
      { slug: slug },
      { $inc: { downVotes: 1 } },
      { new: true } // Return the updated document
    );

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Return the updated post or just the new vote count
    res.json({
      slug: post.slug,
      upVotes: post.upVotes,
      downVotes: post.downVotes
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
