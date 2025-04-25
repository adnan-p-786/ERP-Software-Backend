const express = require('express');
const userModel = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();


router.post('/login-user', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await userModel.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });
  
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
  
      
      const payload = {
        userId: user._id,
        username: user.username,
        role: user.rolesId, // include more fields as needed
      };
  
      // Sign token
      const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
  
      res.json({ message: 'Login successful', token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });



module.exports = router