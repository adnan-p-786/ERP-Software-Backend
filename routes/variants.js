const express = require('express')
const variantsModel = require ('../models/variants')
const router = express.Router()



router.post('/post-variant',async(req,res)=>{
    try {
        const {name,price,value} = req.body
        if (!name || ! price || !value){
            return res.status(400).json({message: "all fields are required"})
        }
        const newData = await variantsModel.create({name,price,value})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-variant', async (req, res) => {
    try {
        const data = await variantsModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router