const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const notesRoutes = require('./routes/notesRoutes');
const ConnectDB = require('./config/db');
const authRoutes = require('./auth/routes/authRoutes');
const authenticateToken = require('./auth/middlewares/authMiddleware');
const morgan = require('morgan');
const cors = require("cors");
const path = require('path'); // to use path for serving static assets
const app = express();

dotenv.config();
ConnectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use('/api', authenticateToken);
app.use('/api', notesRoutes);
app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ message: "Healthy" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Successfully Connected with PORT: ", PORT);
});
