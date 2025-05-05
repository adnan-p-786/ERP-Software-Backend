const express = require('express')
const salesModel = require ('../models/sales')
const salesItemsModel = require ('../models/sales_items')
const accountModel = require ('../models/accounts')
const { authenticateAdmin } = require('./auth')
const router = express.Router()

router.post('/post-sales',authenticateAdmin, async (req, res) => {
    try {
      const reqData = req.body;
      console.log({reqData});
      
  
      const sales = await salesModel.create({
        storeId: reqData.storeId,
        warehouseId: reqData.warehouseId,
        customerId: reqData.customerId,
        total_amount: 0, // temp, updated later
        discountId: reqData.discountId,
        discounted_amount: reqData.discounted_amount,
        usersId: reqData.usersId
      });
  
    let totalAmount = 0;

    for (const item of reqData.SalesItems) {
      totalAmount += item.quantity * item.price;
      await salesItemsModel.create({
        salesId: sales._id,
        stockId: item.stockId,
        quantity: item.quantity,
        unitId: item.unitId,
        price: item.price,
      });
    }
    
    sales.total_amount = totalAmount;
    await sales.save();

    await accountModel.create({
        credit: parseFloat(totalAmount.toFixed(2)),
        debit: 0,
        type: 'sales',
        particulars: 'Sales revenue from recent transaction',
      });
    
      return res.status(200).json({
        message: 'sales created successfully',
        salesId: sales._id
      });
    } catch (error) {
      console.error("Error creating sales:", error);
      return res.status(400).json({ error: error.message || error });
    }
  });





router.get('/get-sales',authenticateAdmin, async (req, res) => {
    try {
        const data = await salesModel.find()
        .populate('customerId')
        .populate('discountId')
        .populate('storeId')
        .populate('warehouseId')
        .populate('usersId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router