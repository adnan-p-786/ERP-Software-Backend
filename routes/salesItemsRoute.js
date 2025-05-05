const express = require('express')
const salesItemsModel = require ('../models/sales_items')
const { authenticateAdmin } = require('./auth')
const router = express.Router()

router.post('/post-salesItems',authenticateAdmin, async(req,res)=>{
    try {
        const {stockId,quantity,unitId,price} = req.body
        if (!stockId || !quantity || !unitId || !price){
            res.status(200).json({message: "all fields are required"})
        }
        const newData = await salesItemsModel.create({stockId,quantity,unitId,price})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-salesItems',authenticateAdmin, async (req, res) => {
    try {
        const data = await salesItemsModel.find()
        .populate('stockId')
        .populate('unitId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router