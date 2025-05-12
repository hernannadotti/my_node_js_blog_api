const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const postsRouter = require('./routes/posts');

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
  res.send('API Running Ok');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
