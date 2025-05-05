const express = require('express')
const variantsModel = require ('../models/variants');
const { authenticateAdmin } = require('./auth');
const router = express.Router()



router.post('/post-variant',authenticateAdmin, async (req, res) => {
    try {
        if (req.body.name){
            const variant = new variantsModel({
                name: req.body.name
            });
            const savedVariant = await variant.save();
            res.status(201).json(savedVariant);
        }
        else{
            return res.status(400).json("name must be required")
        }
        
    } catch (error) {
        res.status(400).json(error);
    }
});


router.get('/get-variant',authenticateAdmin, async (req, res) => {
    try {
        const data = await variantsModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router