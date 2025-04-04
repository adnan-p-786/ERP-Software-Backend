const mongoose = require('mongoose')

const subCategoriesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    categoriesId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories",
            required: true
        }
  });

  module.exports = mongoose.model('subCategories', subCategoriesSchema)

