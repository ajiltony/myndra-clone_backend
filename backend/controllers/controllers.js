const bcrypt = require('bcryptjs');
const User = require('./../models/User');
const Gly = require('../models/gallery');
const Filter = require('../models/filter');
const register = require('./../models/register');
const Addcard=require('../models/addcard')
const jwt=require("jsonwebtoken");
const create = async function(req,res){
    const userData ={
        image:req.body.image,
     }
      User.create(userData)
         .then(user =>{
             res.json(req.body)
                     // res.send({status:'Images stored Successfully!'})
         })
         .catch(err =>{
              res.send('error:'+err)
          })
     }
     const imageslick = require('../models/User');
const read=async(req,res)=>{
    await imageslick.find()
        .then(image =>{res.json(image)})
        .catch(err =>{res.status(400).json('Error'+err)});
    }
      //user registration control
    const users = async (req, res) => {
        const today = new Date()
        const userData = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          phone:req.body.phone,
          Dob:req.body.Dob,
          location:req.body.location,
          created: today
        } 
        register.findOne({
          email: req.body.email
        })
          .then(user => {
            if (!user) {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                register.create(userData)
                  .then(user => {
                    res.json({ status: user.email + 'Registered!' })
                  })
                  .catch(err => {
                    res.send('error: ' + err)
                  })
              })
            } else {
              res.json({ error: 'User already exists' })
            }
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      }

   //user login control 
      const login = async (req, res) => {
        register.findOne({
          email: req.body.email
        })
          .then(user => {
            if (user) {
              if (bcrypt.compareSync(req.body.password, user.password)) {
                // Passwords match
                const payload = {
                  _id: user._id,
                  email: user.email,
                  first_name:user.first_name,
                  last_name:user.last_name,
                  phone:user.phone,
                  Dob:user.Dob,
                  location:user.location
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                  expiresIn: '24h'
                })
                console.log(token);
                res.send(token)
              } else {
                // Passwords don't match
                res.json({ error: 'User does not exist' })
              }
            } else {
              res.json({ error: 'User does not exist' })
            }
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      }
      //user profile control
      const profile = async (req, res) => {
        var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
      
        register.findOne({
          _id: decoded._id
        })
          .then(user => {
            if (user) {
              res.json(user)
            } else {
              res.send('User does not exist')
            }
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      }

       //user EDITprofile control
       const update = async (req, res) => {
         console.log(req.body.token)
        var decoded = jwt.verify(req.headers['authorization']||req.body.token, process.env.SECRET_KEY)
        register.findOne({
          _id: decoded._id
        }).then(user => {
            if (user) {
              register.updateOne({ _id: decoded._id}, {$set: req.body}).then(user=>{
                res.json(req.body)
              })
              .catch(err => {
                res.send('error: ' + err)
              })
            } else {
              res.send('User does not exist')
            }
          })  `1q`
          .catch(err => {
            res.send('error: ' + err)
          })
      }

      const gallery = async function(req,res){
        const userData =new Gly({
            images:req.body.images,
         })
        userData.save()
             .then(user =>{
                 res.json(req.body)
                         // res.send({status:'Images stored Successfully!'})
             })
             .catch(err =>{
                  res.send('error:'+err)
              })
            }
    const readgly=async(req,res)=>{
        await Gly.find()
            .then(image =>{
             const product=image
              res.json(product)
            }).catch(err =>{res.json(err)});
        }
        // filter
    //     const Filter_product = async (req, res) => {
    //       var decoded = jwt.verify(req.headers['authorization']||req.body.token, process.env.SECRET_KEY)
    //     register.findOne({
    //       _id: decoded._id
    //     }).then(user => {
    //         if (user) {
    //           Filter.findOne({product_code:req.body.product_code})
    //           .then(data=>{
    //             if(!data){
  	// 	       const userData = new Filter({
    //           user:decoded._id,
    //           filterimage: req.body.filterimage,
    //           product_name: req.body.product_name,
    //           shop_name: req.body.shop_name,
    //           price: req.body.price,
    //           color:req.body.color,
    //           size:req.body.size,
    //           product_code:req.body.product_code,
    //           sold_by:req.body.sold_by,
    //           catagries:req.body.catagries,
    //           discount:req.body.discount
    //       })
    //       Filter.create(req.body)
    //       .then(stored =>{
    //       res.json({
    //               status:'detiale  stored Successfully!',
    //               user: userData
    //             })
    //     })
    //     .catch(err =>{
    //          res.json({
    //            error : err
    //          })
    //      })
    //     }
    //     else{
    //           res.status(500).send({
    //             message:"product already exits"
    //           });
    //     }
    //   })
    //   .catch(err=>{
    //     res.send(err);
    //   })
    //         } else {
    //           res.send('User does not exist')
    //         }
    //       })
    //       .catch(err => {
    //         res.send('error: ' + err)
    //       })
         
    // }

    // const getfilter=async(req,res)=>{
    //   await Filter.find(req.body)
    //       .then(data =>{
    //        const product=data
    //         res.json(product)
    //       }).catch(err =>{res.json(err)});
    //   }
    const Filter_product = async (req, res) => {
      var decoded = jwt.verify(req.headers['authorization']||req.body.token, process.env.SECRET_KEY)
    register.findOne({
      _id: decoded._id
    }).then(user => {
        if (user) {
          Filter.findOne({product_code:req.body.product_code})
          .then(data=>{
            if(!data){
      const userData = {
          user:decoded._id,
          filterimage: req.body.filterimage,
          product_name: req.body.product_name,
          shop_name: req.body.shop_name,
          price: req.body.price,
          color:req.body.color,
          size:req.body.size,
          product_code:req.body.product_code, 
          sold_by:req.body.sold_by,
          catagries:req.body.catagries,
          discount:req.body.discount,
          old_price:req.body.old_price,
          product_details:req.body.product_details
      }
      Filter.create(userData)
      .then(stored =>{
      res.json({
              status:'detiale  stored Successfully!',
              user: stored
            })
    })
    .catch(err =>{
         res.json({
           error : err
         })
     })
    }
    else{
          res.status(500).send({
            message:"product already exits"
          });
    }
  })
  .catch(err=>{
    res.send(err);
  })
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
     
}
const getallfilter=async(req,res)=>{
  await Filter.find()
      .then(data =>{
       const product=data
        res.json(product)
      }).catch(err =>{res.json(err)});
  }
const getfilter=async(req,res)=>{
  await Filter.find(req.body)
      .then(data =>{
       const product=data
        res.json(product)
      }).catch(err =>{res.json(err)});
  }
// prodect get
const getprodect= async(req,res)=>{
  // console.log(req.params.product_code);
   await Filter.find({product_code:req.params.product_code})
.then(data=>{
  const product=data
  res.json(product)
}).catch(err =>{res.json(err)});
}
  
    module.exports = {
        create:create,
        read:read,
        users:users,
        login:login,
        profile:profile,
        update:update,
        gallery:gallery,
        readgly:readgly,
        Filter:Filter_product,
        getallfilter:getallfilter,
        getfilter:getfilter,
        getprodect:getprodect
          
    }  
