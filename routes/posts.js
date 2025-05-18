const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// @route   GET blog
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET blog/:slug
// @desc    Get post by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const slugParam = req.params.slug;
    console.log(`[posts.js] Received request for slug: "${slugParam}"`);

    if (typeof slugParam !== 'string' || slugParam.length === 0) {
      console.error('[posts.js] Invalid slug parameter:', slugParam);
      return res.status(400).json({ msg: 'Invalid slug format' });
    }

    const query = { slug: slugParam };
    console.log('[posts.js] Querying Post model with:', JSON.stringify(query));
    const post = await Post.findOne(query);

    if (!post) {
      console.log(`[posts.js] Post not found for slug: "${slugParam}"`);
      return res.status(404).json({ msg: 'Post not found' });
    }

    console.log(`[posts.js] Post found for slug: "${slugParam}", ID: ${post._id}`);
    res.json(post);

  } catch (err) {
    console.error(`[posts.js] Error fetching post for slug: "${req.params.slug}". Error: ${err.message}`);
    console.error('[posts.js] Full error object:', err); // Log the full error object
    if (err.name === 'CastError' && err.path === '_id') {
       console.error('[posts.js] CRITICAL: Caught a CastError for _id. This is highly unexpected when querying by slug. Value that failed to cast:', err.value);
    }
    res.status(500).send('Server Error');
  }
});


module.exports = router;
