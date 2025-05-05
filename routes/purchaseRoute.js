const express = require('express')
const purchaseModel = require ('../models/purchase')
const purchaseItemsModel = require ('../models/purchase_items')
const otherpurchaseModel = require ('../models/purchaseotherExp')
const stockModel = require ('../models/stocks')
const vendorAccountModel = require ('../models/vendorsAccounts')
const productModel = require ('../models/product')
const unitModel = require ('../models/units')
const { authenticateAdmin } = require('./auth')
const router = express.Router()

router.post('/post-purchase',authenticateAdmin, async (req, res) => {
    try {
      const reqData = req.body;
      console.log({reqData});
      
  
      const other_cost_total = reqData.other_costs?.reduce((sum, cost) => {
        return sum + parseFloat(cost.amount.toFixed(2));
      }, 0) || 0;
  
      const purchase = await purchaseModel.create({
        billNo: reqData.billNo,
        warehouseId: reqData.warehouseId,
        vendorId: reqData.vendorId,
        storeId: reqData.storeId,
        totalAmount: 0, // temp, updated later
        otherExpense: other_cost_total
      });
  
      if (reqData.other_costs) {
        for (const cost of reqData.other_costs) {
          await otherpurchaseModel.create({
            purchaseId: purchase._id,
            otherExpenseId: cost.otherCostId,
            amount: parseFloat(cost.amount.toFixed(2)),
          });
        }
      }
  
      let total_price = 0;
      let total_quantity = 0;
  
      for (const item of reqData.purchaseItems) {
        const unit = await unitModel.findById(item.unitId);
        if (!unit) throw new Error(`Unit with ID ${item.unitId} not found`);
  
        const product = await productModel.findById(item.productId);
        if (!product) throw new Error(`Product with ID ${item.productId} not found`);
  
        const productPrefix = product.name.substring(0, 3).toUpperCase();
        const stockCount = await stockModel.countDocuments();
        const uniqueNumber = (stockCount + 1).toString().padStart(5, '0');
        const productCode = `${productPrefix}-${uniqueNumber}`;
  
        if (item.total_amount !== undefined) {
          total_price += parseFloat(item.total_amount.toFixed(2));
      }
      
        total_quantity += item.quantity;
  
        await productModel.findByIdAndUpdate(item.productsId, {
          getting_price: item.price,
        });

        if (item.price !== undefined) {
          await productModel.findByIdAndUpdate(item.productsId, {
              getting_price: parseFloat(item.price.toFixed(2)),
          });
      }
      
        await purchaseItemsModel.create({
          purchaseId: purchase._id,
          productId: item.productId,
          unitsId: item.unitId,
          quantity:item.quantity,
          purchasePrice:item.purchasePrice,
          sellingPrice: item.sellingPrice,
          variantsId: item.variantId
        });
  
        await stockModel.create({
          productId: item.productId,
          unitId: item.unitId,
          quantity: item.quantity,
          purchase_price: item.purchasePrice,
          selling_price: item.sellingPrice,
          storeId: reqData.storeId,
          warehouseId: reqData.warehouseId,
          vendorId: reqData.vendorId,
          billNo: reqData.billNo
        });
      }
  
      const grand_total = parseFloat((total_price + other_cost_total).toFixed(2));
  
      await purchaseModel.findByIdAndUpdate(purchase._id, {
        totalAmount: parseFloat(total_price.toFixed(2)),
        otherExpense: other_cost_total
      });
  
      await vendorAccountModel.create({
        type: 'purchase',
        debit: 0,
        credit: parseFloat(total_price.toFixed(2)),
        vendorsId: reqData.vendorId,
      });
  
      return res.status(200).json({
        message: 'Purchase created successfully',
        purchaseId: purchase._id
      });
    } catch (error) {
      console.error("Error creating purchase:", error);
      return res.status(400).json({ error: error.message || error });
    }
  });

  router.get('/get-purchase',authenticateAdmin, async (req, res) => {
    try {
        const data = await purchaseModel.find()
        .populate('vendorId')
        .populate('storeId')
        .populate('warehouseId')
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router



  