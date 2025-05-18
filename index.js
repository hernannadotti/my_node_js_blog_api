const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const postsRouter = require('./routes/posts');
const votesRouter = require('./routes/votes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/blog', postsRouter);
app.use('/vote', votesRouter);

app.get('/', (req, res) => {
  res.send('API Running ok');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
