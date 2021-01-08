const user = require('../models/user');
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