const express = require('express')
const rolesModel = require ('../models/roles')
const router = express.Router()



router.post('/create-roles',async(req,res)=>{
    try {
        const {name,description,privilegesId} =req.body
        if (!name || !description || !privilegesId){
            return res.status(400).json({message: "name, description and privilegesId are required"})
        }
        const newRole = await rolesModel.create({name, description, privilegesId})
        res.status(201).json(newRole)
    } catch (error) {
        res.status(400).json(error)
    }
})




module.exports = router