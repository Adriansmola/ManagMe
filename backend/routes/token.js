const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newToken = jwt.sign({ email: verified.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    const newRefreshToken = jwt.sign({ email: verified.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });

    res.json({ token: newToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.status(400).json({ message: 'Invalid refresh token' });
  }
});

module.exports = router;