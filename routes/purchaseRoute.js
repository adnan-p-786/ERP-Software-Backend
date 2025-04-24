const express = require('express')
const purchaseModel = require ('../models/purchase')
const purchaseItemsModel = require ('../models/purchase_items')
const router = express.Router()

router.post('/post-purchase', async (req, res) => {
    const { billNo, vendorId, storeId, warehouseId, totalAmount, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Purchase items are required" });
    }

    try {
        // Step 1: Create the Purchase document
        const newPurchase = new purchaseModel({
            billNo,
            vendorId,
            storeId,
            warehouseId,
            totalAmount
        });

        const savedPurchase = await newPurchase.save();

        // Step 2: Insert items one by one
        for (const item of items) {
            const newItem = new purchaseItemsModel({
                ...item,
                purchaseId: savedPurchase._id
            });
            await newItem.save();
        }

        res.status(201).json({ message: "Purchase created successfully", purchaseId: savedPurchase._id });

    } catch (error) {
        console.error("Error creating purchase:", error);
        res.status(500).json({ message: "Server error" });
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