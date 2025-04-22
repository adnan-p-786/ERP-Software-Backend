const express = require('express')
const productsModel = require ('../models/product')
const router = express.Router()


router.post('/post-product',async(req,res)=>{
    try {
        const {name,description,categoriesId,subCategoriesId,brandId,unitsId,racksId,quantityAlert,vat}= req.body
        if (!name || !description || !categoriesId ||!subCategoriesId ||!brandId ||!unitsId ||!racksId ||!quantityAlert ||!vat )
            res.status(400).json({message: "all fields are required"})
        const newData = await productsModel.create({name,description,categoriesId,subCategoriesId,brandId,unitsId,racksId,quantityAlert,vat})
        res.status(201).json(newData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.get('/get-product',async(req, res) => {
   
    try {
       
        
        const data = await productsModel.find()
        .populate('categoriesId')
        .populate('subCategoriesId')
        .populate('brandId')
        .populate('unitsId')
        .populate('racksId')
        if(data.length > 0){
            return  res.status(200).json(data);
        }else{
            return res.status(400).json("no data");
        }
    } catch (error) {
       return res.status(400).json(error.message);
    }
});


router.put('/put-product/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateData = await productsModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updateData)
    } catch (error) {
        res.status(400).json(error)
    }
})


router.delete('/delete-product/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteData = await productsModel.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ message: "product not found" });
        }
        res.status(200).json({ message: "product deleted successfully", deletedproduct: deleteData });
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router