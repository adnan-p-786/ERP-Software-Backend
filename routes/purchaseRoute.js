const express = require('express')
const purchaseModel = require ('../models/purchase')
const purchaseItemsModel = require ('../models/purchase_items')
const otherpurchaseModel = require ('../models/purchaseotherExp')
const stockModel = require ('../models/stocks')
const vendorAccountModel = require ('../models/vendorsAccounts')
const variantModel = require ('../models/variants')
const productModel = require ('../models/product')
const unitModel = require ('../models/units')
const router = express.Router()

router.post('/post-purchase', async (req, res) => {
    try {
      const reqData = req.body;
  
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
  
      for (const item of reqData.purchaseitems) {
        const unit = await unitModel.findById(item.unitsId);
        if (!unit) throw new Error(`Unit with ID ${item.unitsId} not found`);
  
        let variantId = null;
  
        if (item.variant) {
          let variant = await variantModel.findOne({ name: item.variant });
          if (!variant) {
            variant = await variantModel.create({
              name: item.variant,
              price: item.price || 0,
              value: item.variantValue || 'default'
            });
          }
          variantId = variant._id;
        }
  
        const product = await productModel.findById(item.productsId);
        if (!product) throw new Error(`Product with ID ${item.productsId} not found`);
  
        const productPrefix = product.name.substring(0, 3).toUpperCase();
        const stockCount = await stockModel.countDocuments();
        const uniqueNumber = (stockCount + 1).toString().padStart(5, '0');
        const productCode = `${productPrefix}-${uniqueNumber}`;
  
        total_price += parseFloat(item.total_amount.toFixed(2));
        total_quantity += item.quantity;
  
        await productModel.findByIdAndUpdate(item.productsId, {
          getting_price: item.price,
        });
  
        await purchaseItemsModel.create({
          purchaseId: purchase._id,
          productId: item.productsId,
          unitsId: item.unitsId,
          quantity: parseFloat(item.quantity.toFixed(2)),
          purchasePrice: parseFloat(item.price.toFixed(2)),
          sellingPrice: item.selling_price,
          variantsId: variantId
        });
  
        await stockModel.create({
          productId: item.productsId,
          unitId: item.unitsId,
          quantity: item.quantity.toFixed(2),
          purchase_price: item.total_amount,
          selling_price: item.selling_price,
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

  router.get('/get-purchase', async (req, res) => {
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


// router.post('/post-purchase', async (req, res) => {
//     try {
//       const reqData = req.body;
  
//       // Calculate total of other costs
//       const other_cost_total = reqData.other_costs?.reduce((sum, cost) => {
//         return sum + parseFloat(cost.amount.toFixed(2));
//       }, 0) || 0;
  
//       // Create the purchase
//       const purchase = await purchaseModel.create({
//         billNo: reqData.billNo,
//         warehouseId: reqData.warehouseId,
//         vendorId: reqData.vendorId,
//         storeId: reqData.storeId,
//       });
  
//       // Handle other costs
//       if (reqData.other_costs) {
//         for (const cost of reqData.other_costs) {
//           await otherpurchaseModel.create({
//             purchaseId: purchase._id,
//             otherCostId: cost.otherCostId,
//             amount: parseFloat(cost.amount.toFixed(2)),
//           });
//         }
//       }
  
//       let totalAmount = 0;
//       let total_quantity = 0;
  
//       for (const item of reqData.purchaseitems) {
//         const unit = await unitModel.findById(item.unitsId);
//         if (!unit) throw new Error(`Unit with ID ${item.unitsId} not found`);
  
//         let variantId = null;
//         let vatId = null;
  
//         if (item.variant) {
//           let variant = await variantModel.findOne({ name: item.variant });
//           if (!variant) {
//             variant = await variantModel.create({ name: item.variant });
//           }
//           variantId = variant._id;
//         }
  
//         if (item.vat) {
//           let vat = await vatModel.findOne({ vat: item.vat });
//           if (!vat) {
//             vat = await vatModel.create({ vat: item.vat });
//           }
//           vatId = vat._id;
//         }
  
//         const product = await productModel.findById(item.productsId);
//         if (!product) throw new Error(`Product with ID ${item.productsId} not found`);
  
//         const productPrefix = product.name.substring(0, 3).toUpperCase();
//         const stockCount = await stockModel.countDocuments();
//         const uniqueNumber = (stockCount + 1).toString().padStart(5, '0');
//         const productCode = `${productPrefix}-${uniqueNumber}`;
  
//         total_price += parseFloat(item.total_amount.toFixed(2));
//         total_quantity += item.quantity;
  
//         await productModel.findByIdAndUpdate(item.productsId, {
//           getting_price: item.price,
//         });
  
//         await purchaseItemsModel.create({
//           purchaseId: purchase._id,
//           productsId: item.productsId,
//           unitsId: item.unitsId,
//           quantity: item.quantity,
//           total_amount: item.total_amount,
//           selling_price: item.selling_price,
//           total_product_cost: item.total_product_cost,
//           amount: item.amount,
//           mrp: item.mrp,
//           price: parseFloat(item.price.toFixed(2)),
//           tax_price: parseFloat(item.tax_price.toFixed(2)),
//           variantCombinationsId,
//           vatId,
//           total_tax: item.total_tax_price,
//         });
  
//         await stockModel.create({
//           productsId: item.productsId,
//           unitsId: item.unitsId,
//           quantity: parseFloat(item.quantity.toFixed(2)),
//           purchase_price: item.total_amount,
//           selling_price: item.selling_price,
//           storeId: reqData.storeId,
//           warehouseId: reqData.warehouseId,
//           vendorId: reqData.vendorId,
//           billno: item.billno
//         });
//       }
  
//       const grand_total = parseFloat(
//         (total_price + (reqData.other_costs?.reduce((sum, cost) => sum + cost.amount, 0) || 0)).toFixed(2)
//       );
  
//       await purchaseModel.findByIdAndUpdate(purchase._id, {
//         total_price: parseFloat(total_price.toFixed(2)),
//         grand_total,
//         total_quantity,
//       });
  
//       await vendorAccountModel.create({
//         type: item.type,
//         debit: item.debit,
//         credit: parseFloat(total_price.toFixed(2)),
//         vendorId: reqData.vendorId,
//       });
  
//       return res.status(200).json({ message: 'Purchase created successfully', purchaseId: purchase._id });
//     } catch (error) {
//       console.error("Error creating purchase:", error);
//       return res.status(400).json({ error: error.message || error });
//     }
//   });








// router.post('/create', async (req, res) => {
//   try {
//     const reqData = req.body;

//     const other_cost_total = reqData.other_costs?.reduce((sum, cost) => {
//       return sum + parseFloat(cost.amount.toFixed(2));
//     }, 0) || 0;

//     const purchase = await Purchase.create({
//       bill_no: reqData.bill_no,
//       wareHouseId: reqData.wareHouseId,
//       vendorsId: reqData.vendorsId,
//       storesId: reqData.storesId,
//       total_price: 0,
//       grand_total: 0,
//       total_quantity: 0,
//       other_cost_total,
//       date: new Date(reqData.date),
//       bill_date: reqData.bill_date,
//       due_date: reqData.due_date
//     });

//     if (reqData.other_costs) {
//       for (const cost of reqData.other_costs) {
//         await PurchaseCost.create({
//           purchaseId: purchase._id,
//           otherCostId: cost.otherCostId,
//           amount: parseFloat(cost.amount.toFixed(2)),
//         });
//       }
//     }

//     let total_price = 0;
//     let total_quantity = 0;

//     for (const item of reqData.purchase_items) {
//       const unit = await Unit.findById(item.unitsId);
//       if (!unit) throw new Error(`Unit with ID ${item.unitsId} not found`);

//       let variantCombinationsId = null;
//       let vatId = null;

//       if (item.variant) {
//         let variant = await VariantCombination.findOne({ name: item.variant });
//         if (!variant) {
//           variant = await VariantCombination.create({ name: item.variant });
//         }
//         variantCombinationsId = variant._id;
//       }


//       const product = await Product.findById(item.productsId);
//       if (!product) throw new Error(`Product with ID ${item.productsId} not found`);

//       const productPrefix = product.name.substring(0, 3).toUpperCase();
//       const stockCount = await Stock.countDocuments();
//       const uniqueNumber = (stockCount + 1).toString().padStart(5, '0');
//       const productCode = `${productPrefix}-${uniqueNumber}`;

//       total_price += parseFloat(item.total_amount.toFixed(2));
//       total_quantity += item.quantity;

//       await Product.findByIdAndUpdate(item.productsId, {
//         getting_price: item.price,
//       });

//       await purchaseItemsModel.create({
//         purchaseId: purchase._id,
//         productsId: item.productsId,
//         unitId: item.unitId,
//         purchasePrice: item.purchasePrice,
//         sellingPrice: item.sellingPrice,
//         variantId:item._id,
//         quantity: item.quantity
//       });

//       await Stock.create({
//         productsId: item.productsId,
//         wareHouseId: reqData.wareHouseId,
//         storesId: reqData.storesId,
//         unitsId: item.unitsId,
//         purchaseId: purchase._id,
//         getting_price: item.price,
//         quantity: parseFloat(item.quantity.toFixed(2)),
//         purchase_price: item.total_amount,
//         selling_price: item.selling_price,
//         tax_price: parseFloat(item.tax_price.toFixed(2)),
//         mrp: item.mrp,
//         product_code: item.barcode ? item.barcode : productCode,
//         variantCombinationsId,
//         vatId
//       });
//     }

//     const grand_total = parseFloat(
//       (total_price + (reqData.other_costs?.reduce((sum, cost) => sum + cost.amount, 0) || 0)).toFixed(2)
//     );

//     await Purchase.findByIdAndUpdate(purchase._id, {
//       total_price: parseFloat(total_price.toFixed(2)),
//       grand_total,
//       total_quantity,
//     });

//     await VendorAccount.create({
//       vendorsId: reqData.vendorsId,
//       type: 'credit',
//       credit: parseFloat(total_price.toFixed(2)),
//       storesId: reqData.storesId,
//     });

//     return res.status(200).json({ message: 'success' });
//   } catch (error) {
//     return res.status(400).json({ error: error.message || error });
//   }
// });




// router.post('/post-purchase', async (req, res) => {
//     const { billNo, vendorId, storeId, warehouseId, purchaseitems } = req.body;

//     if (!purchaseitems || !Array.isArray(purchaseitems) || purchaseitems.length === 0) {
//         return res.status(400).json({ message: "Purchase items are required" });
//     }

//     try {
//         // Step 1: Create the Purchase document
//         const newPurchase = new purchaseModel({
//             billNo,
//             vendorId,
//             storeId,
//             warehouseId
//         });

//         const savedPurchase = await newPurchase.save();

//         // Step 2: Insert items one by one
//         for (const item of items) {
//             const newItem = new purchaseItemsModel({
//                 ...item,
//                 purchaseId: savedPurchase._id
//             });
//             await newItem.save();
//         }

//         res.status(201).json({ message: "Purchase created successfully", purchaseId: savedPurchase._id });

//     } catch (error) {
//         console.error("Error creating purchase:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

  