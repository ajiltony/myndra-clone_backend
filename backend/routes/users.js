const express = require('express');
const users = express.Router();
 const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const controllers = require('../controllers/controllers');
const addcontrollers = require('../controllers/addcontroler');
const address = require ('../controllers/addresscontrolar');
const orderController=require('../controllers/order')

 users.use(cors());  

process.env.SECRET_KEY ='secret'
//create slick 
users.post('/image',controllers.create);
 //read slick
users.get('/readimg',controllers.read);
// create user register
users.post('/register',controllers.users);
// create user login
users.post('/login',controllers.login);
//user profile update
users.put('/profileupdate',controllers.update);
// read user profile
users.get('/profile',controllers.profile);
//create gellery
users.post('/imagegly',controllers.gallery); 
 //read gellery
users.get('/readgly',controllers.readgly);
// create filter
 users.post('/filter',controllers.Filter); 
//  getall
users.get('/getallfilter',controllers.getallfilter);
// read filter
 users.post('/getfilter',controllers.getfilter);
//  get product
 users.get('/getproduct/:product_code',controllers.getprodect);
//   add card
users.post('/addcard',addcontrollers.Adcard);
//  get add card
users.get('/baggetall/:token',addcontrollers.bagall);
// delete item 
users.delete('/delitem',addcontrollers.delitem);
//Update quantity
users.put('/qtyUpdate',addcontrollers.qtyUpdate);
// post address
users.post('/Address/:token',address.create);
// get address
users.get('/getAddress',address.getAddress);
// findone address
users.post('/oneAddress',address.oneAddress);
// update
users.put('/updateAddress',address.updateAddress);
// delete
users.delete('/delAddress',address.delAddress);
// orderdetails
users.post("/createOrder", orderController.createOrder);
 //Posr Order
users.post("/getOrder", orderController.getOrder); 
//Get Order By UserID
users.post("/getOrderByProductId/:productId", orderController.getOrderByProductId);
 //Get Order By ProductId
users.post("/getOrderByOrderId/:orderId", orderController.getOrderByOrderId);
 //Get Order By OrderId
users.put("/cancelOrder", orderController.cancelOrder); 
//Put Order(cancel order)
users.delete("/deleteOrder", orderController.deleteOrder);

module.exports = users; 