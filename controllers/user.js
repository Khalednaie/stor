const { json } = require('body-parser');
const { errorHandler } = require('../helpers/dberr');
const { Order } = require('../models/order');
// const user = require('../models/user');
const User = require('../models/user');

exports.userById = (req,res,next,id)=>{
User.findById(id).exec((err,user)=>{
if(err || !user){
    return res.status(400).json({
        error:'User not found'
    }) 
}
req.profile = user;
next();
});
};

exports.read=(req,res)=>{
    req.profile.hashed_password=undefined;
    req.profile.salt=undefined;
    return res.json(req.profile);
}

exports.update=(req,res)=>{
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true},
        (err,user)=>{
            // console.log('user:',user)
            if(err){
                return res.status(400).json({
                    error:'you are not authorized to perform this action'
                });
            } 
            // console.log('user:',user)
    user.hashed_password=undefined;
    user.salt=undefined;
    console.log('user:',user)
    res.json(user);
       
        });
};

exports.addOrderToUser=(req,res,next)=>{
    let histoty = []
    req.body.order.products.forEach((item)=>{
        histoty.push({
            _id:item._id,
            name:item.name,
            description:item.description,
            category:item.category,
            quantity:item.conut,
            transaction_id:req.body.order.transaction_id,
            amount:req.body.order.amount,
        })
    })
    
    User.findOneAndUpdate({_id:req.profile._id},
                          {$push:{histoty:histoty}},
                          {new:true},
                          (error,data)=>{
                            if(error){
                                return res.status(400),json({
                                    error:'error in findOne in user.js in controlle'
                                })
                            }
                            next();
                            // res.json(data);
                            console.log('data in findOne in user.js in controlle',data);
                          })


}

exports.purchaseHistory=((req,res)=>{
    Order.find({user:req.profile._id})
    .populate('user','_id name')
    .sort('-created')
    .exec((err,orders)=>{
        if(err){
            return res.status(400),json({
                erroe : errorHandler(err)
            })
        }
        res.json(orders)
    })

})
