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
  const SECRET = process.env.JWT_SECRET
      // Sign token
      const token = jwt.sign(payload,SECRET, { expiresIn: '1h' });
      console.log({token});
      
       return res.json({ message: 'Login successful', token,user }).status(200);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  

  router.get('/get-user',async(req,res)=>{
    try {
        const user = await userModel.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router