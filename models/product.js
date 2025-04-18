const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categoriesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    subCategoriesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategories",
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand",
        required: true
    },
    unitsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "units",
        required: true
    },
    racksId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "racks",
        required: true
    },
    quantityAlert: {
        type: String,
        required: true,
    },
    vat: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('products', productsSchema)

