const bcrypt = require('bcryptjs');
const Addcard = require('../models/addcard');
const Filter = require('../models/filter');
const register = require('../models/register'); 
const jwt = require("jsonwebtoken");
const Adcard = async function (req, res) {
   var decoded = jwt.verify(req.headers['authorization'] || req.params.token, 'secret')
   console.log('id',decoded._id);
   
   register.findOne({ 
      _id: decoded._id
   }) 
      .then(user => {
         if (user) {
            if (req.body.size == '' || req.body.size == 'undefined') {
             return res.send({ message:'plz click size'})
            }
            else {
               if (req.body.product == '' || req.body.product == 'undefined') {
                return res.send({ message:'product id add your product bag'})
               }
               else {
                  Filter.findOne({
                     _id: req.body.product
                  })
                     .then(prod => {
                 if (prod) {
                           Addcard.findOne({ product: req.body.product, user: decoded._id })
                              .then(bagdata => {
                                 console.log("ok", decoded._id)
                                 if (!bagdata) {
                                    var bag = new Addcard({
                                       size: req.body.size,
                                       quantity: 1,
                                       product: prod,
                                       user: decoded._id

                                    })
                                    bag.save().then(bags => {
                                       if (!bags) {
                                          return res.send({ message: 'errr' })
                                       }
                                       else {
                                          Addcard.find({ user: bags.user }, async (err, bagstore) => {
                                             if (bagstore) {
                                                await register.updateOne({ _id: decoded._id }, { $set: { bag: bags } })
                                                return res.status(200).send({ message: 'product add your bag successfully', data: bags })
                                          
                                             
                                             }
                                             else {
                                                return res.send({ message: ' some problem add your product' })
                                             }
                                          })
                                       }
                                    }).catch(err => {
                                      
                                    })
                                 }
                                 else {
                                    Addcard.find({ user: decoded._id }, async (err, bagstore) => {
                                       if (bagstore) {
                                          return res.json({ message: 'already product added', data: bagstore })
                                       }
                                       else {
                                          return res.send({ message: ' some problem add your product' })
                                       }
                                    })
                                 }
                              })
                              .catch
                              (err => { res.json(err) })
                        }
                        else {
                           return res.send({ message: 'sorry product not found' })
                        }
                     })
                     .catch(err => { res.json(err) });
               }
            }
         }
         else {
            return res.send({ message: 'sry user' })
         }
      })
      .catch(err => { res.json(err) });
}

// get all
const bagall = async function (req, res) {
   console.log('token',req.params.token)
   var decoded = jwt.verify(req.headers['authorization'] || req.params.token, 'secret')
   register.findOne({
      _id: decoded._id
   })
      .then(data => {
         if (data) {
            Addcard.find({ user: data._id })
               .populate('product')
               .then(data => {
                  if (data) {
                     return res.send({ message: 'product get succefully', data: data });
                  }
                  else {
                     return res.send({ message: 'add somtimes problem' })
                  }
               })
               .catch(err => { res.send({ message: 'somtime wrom', err: err }) })
         }
      })
      .catch(err=> {res.send({message:'something wrong get your account'})})
}
// delete card item
  const delitem  = async function (req, res) {
     console.log(req.body)
   var decoded = jwt.verify( req.body.token, 'secret')
   register.findOne({
      _id: decoded._id
   })
   .then(user=>{
      if (user) {
         Addcard.findOne({ user: decoded._id ,_id:req.body._id,product:req.body.product}) 
         .then(data=> {
            if (data) {
               Addcard.deleteOne({user:decoded._id ,_id:req.body._id,product:req.body.product},async(err,deldata)=>{
                  if (deldata) {
                     await register.updateOne({ _id: decoded._id }, { $set: { bag: data } })
                     return res.status(200).send({ message: 'product deleted successfully', data: data })
                  }
                  else {
                     return res.send({ message: ' some problem delete your product' })
                  }
            }).catch(err=> {res.send({message:'something wrong delete ur product'})})
         }
            else{
               return res.send({ message: ' cannot find your account' })
            }
         }).catch(err=> {res.send({message:'somthing wrong to find your product'})})
      }
       
   })
   .catch(err=> {res.send({message:'cannot find your account'})})
}



const qtyUpdate = async function(req, res) {
   const body = req.body;
   console.log(body)
 
   // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

   Addcard.findOne({
      _id:req.body.id
    }).then(user=>{
      console.log(user)
      if(user){
         Addcard.findByIdAndUpdate({_id:req.body.id},{$set:req.body}).then(data=>{
            res.json(data)
        console.log(req.body)
        
      }).catch(err=>{
        console.log(err)
      })
    }})
 
};

module.exports = {
   Adcard: Adcard,
   bagall:bagall,
   delitem:delitem,
   qtyUpdate:qtyUpdate
}