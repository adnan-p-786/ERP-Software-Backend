const express = require('express')
const connectDB = require('./db')
const app = express()
const port = 3000
const cors =require('cors')

app.use(cors())
app.use(express.json())


app.use('/api',require('./routes/userRoute'))
app.use('/api',require('./routes/rolesRoute'))
app.use('/api',require('./routes/privilegesRoute'))
app.use('/api',require('./routes/customerRoute'))
app.use('/api',require('./routes/vendorsRoute'))
app.use('/api',require('./routes/customerAccountsRoute'))
app.use('/api',require('./routes/vendorsAccountRoute'))
app.use('/api',require('./routes/categoriesRoute'))
app.use('/api',require('./routes/subCategoriesRoute'))
app.use('/api',require('./routes/departmentsRoute'))
app.use('/api',require('./routes/racksRoute'))
app.use('/api',require('./routes/stockRoute'))
app.use('/api',require('./routes/salesRoute'))
app.use('/api',require('./routes/productRoute'))
app.use('/api',require('./routes/purchaseRoute'))
app.use('/api',require('./routes/storesRoute'))
app.use('/api',require('./routes/expenseTypeRoute'))
app.use('/api',require('./routes/expenseRoute'))
app.use('/api',require('./routes/accountRoute'))
app.use('/api',require('./routes/discountRoute'))
app.use('/api',require('./routes/locationRoute'))
app.use('/api',require('./routes/warehouseRoute'))
app.use('/api',require('./routes/brandRoute'))
app.use('/api',require('./routes/unitsRoute'))


app.use('/api/images', express.static('upload/images'));



app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  connectDB()
  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  }) 