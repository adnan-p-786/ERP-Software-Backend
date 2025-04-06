const express = require('express');
const userModel = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();



router.post('/create-user', async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            password,
            phone,
            dob,
            gender,
            jobtitle,
            empcode,
            joiningDate,
            address,
            basicSalary,
            departmentID,
            rolesId,
            racksId,
        } = req.body;


        // if (!name || !username || !email || !password) {
        //     return res.status(400).json({ message: "Name, username, email, and password are required" });
        // }


        const existingUser = await userModel.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(400).json({
                message: existingUser.email === email
                    ? "Email already in use"
                    : "Username already in use"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        


        // Generate token
        const token = jwt.sign({ id: newData._id }, process.env.JWT_SECRET);


        // Create new user
        const newData = await userModel.create({
            name,
            username,
            email,
            password: hashedPassword,
            phone,
            dob,
            gender,
            jobtitle,
            empcode,
            joiningDate,
            address,
            basicSalary,
            departmentID,
            rolesId,
            racksId
        });


        return res.status(201).json({
            success: true,
            token,
            user: newData,
        });

    } catch (error) {
        res.status(400).json({ error });
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