const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');



require('dotenv/config');
const api = process.env.API_URL;
const productRouter = require('./routers/products');
const userRouter = require('./routers/users');
const orderRouter = require('./routers/orders');
const categoryRouter = require('./routers/categories');




app.use(cors);
app.options('*',cors);
//middleware
 app.use(bodyParser.json());
 app.use(morgan('tiny'));


 //routers
 app.use(`${api}/products`,productRouter);
 app.use(`${api}/users`,userRouter);
 app.use(`${api}/orders`,orderRouter);
 app.use(`${api}/categories`,categoryRouter);
 



mongoose.connect(process.env.MONGO_DB_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'nukadb'}).then(()=>{
    console.log('*****db connection success*****');
});



app.listen(3000,()=>{

    console.log(api);
    console.log( 'listing to port:: 3300!');

});

