const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json())


app.use("/api", require("./routes/auth.route"))
app.use("/api", require("./routes/product.route"))
app.use('/api', require("./routes/users.route"))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Welcome to the API'
  })
})


app.listen(port, () => {
  console.log('Documentation is running on http://localhost:3000/api-docs')
  console.log(`Server is running on port ${port}`);
})