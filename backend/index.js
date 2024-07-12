const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require('./routes/auth');
const tokenRoute = require('./routes/token');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/token', tokenRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));