const express = require('express');
<<<<<<< HEAD
const bodyParser = require('body-parser');
const db = require('./models');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(cors({
  origin: ['http://localhost:3001','http://localhost:3000'], // your React app's port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

// Routes
app.use('/api/accounts', require('./routes/account.routes'));
app.use('/api/destinations', require('./routes/destination.routes'));
app.use('/server/incoming_data', require('./routes/daatahandler.routes'));

// Sync DB
db.sequelize.sync().then(() => {
  console.log("Database synced.");
}).catch(err => {
  console.error("DB sync failed:", err.message);
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
=======
const { initDB } = require('./models');
const accountRoutes = require('./routes/accountRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const dataHandlerRoutes = require('./routes/dataHandlerRoutes');

const app = express();
app.use(express.json());

app.use('/api/accounts', accountRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/server', dataHandlerRoutes);

const PORT = process.env.PORT || 3000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
>>>>>>> fca309a (sequelize methods)
});
