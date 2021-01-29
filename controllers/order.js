const {Order,CartItem} =require('../models/order');
const {errorHandler}=require('../helpers/dberr');

exports.orderById = (req,res,next,id)=>{
    Order.findById(id)
    .populate('products.prodict','name price')
    .exec((err,order)=>{
        if(err||!order){
            res.status(400).json({
                error:errorHandler(err)
            })
        }req.order=order
        next()
    })
}

exports.create = (req,res)=>{
    // console.log('create order : ',req.body)
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((error,data)=>{
        if(error){
            return res.status(400).json({
                error : errorHandler(error)
            })
        }
        res.json(data)
        console.log(data)
    })
};

exports.listOrders= (req,res)=>{
    Order.find()
    .populate('user','_id name address')
    .sort('-created')
    .exec((error,orders)=>{
        if(error){
            res.status(400).json({
                error:errorHandler(error)
            })
            console.log('reeeeeeeeeeerrrr',errorHandler(error))
        }
        res.json(orders)
        console.log('list orders :',orders)
    })
};

exports.getStatusValues=(req,res)=>{
    res.json(Order.schema.path('status').enumValues)
}

exports.updatOrderStatus = (req,res)=>{
    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err||!order){
                res,status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(order)
    });
}
