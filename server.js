const express = require('express');

const connectDB = require('./config/db');
const startBot = require('./bot');
const routes = require('./routes/routes');

const app = express();

// Connect to Database
connectDB();

// Start the bot
startBot();

// Import routes
app.use('/', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
