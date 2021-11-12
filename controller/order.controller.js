const orderModel = require('../models/Order');
const vendorOderModel = require('../models/VendorOrders');

async function createOrder(req,res){
    let response = {};
    const {products,amount,discount,grandtotal} = req.body;
    let temp = [];
    try{
        if(!products) temp.push('products');
        if(!amount) temp.push('amount');
        if(!discount) temp.push('discount');
        if(!grandtotal) temp.push('grandtotal');

        if(temp.length > 0){
            response = {message: 'please give required field', status: 400};
            return res.status(400).json(response);
        }
        req.body.userId = req.user.id;
        req.body.status = 'pending';
        const newOrder = new orderModel(req.body);
        const save = await newOrder.save();

        const getOrder = await orderModel.findOne({_id: save._id}).populated('products');
        getOrder.products.forEach(async(item)=>{
            const VendorOrder = new vendorOderModel({
                userId: req.user.id,
                products: item._id,
                vendorId: item.vendorId,
                orderId: save._id
            })

            await VendorOrder.save();
        })
        response = {message: 'successfully created order', status: 201, data:save};
        return res.status(201).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function getOrder(req,res){
    let response = {};
    let query = {};
    const {userId,id} = req.query;
    try{
        if(id) query._id = id;
        if(userId) query.userId = userId;

        const orders = await orderModel.find(query);
        const data = id ? orders[0] : orders;

        response = {message: 'success', status: 200, data};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function putOrder(req,res){
    let response = {};
    const {id} = req.query;
    const {status,
        products,
        amount,
        discount,
        grandtotal,
        paidAmount,
        pendingAmount} = req.body;
    let setObj = {};
    try{
        if(!id){
            response = {message:'id is required for update', status: 400};
            return res.status(400).json(response);
        }
        if(status) setObj.status = status;
        if(products) setObj.products = products;
        await orderModel.updateMany({_id:id}, {$set: setObj});

        response = {message:'success', status: 200};
        return res.status(200).json(response);
    }
    catch(err){

    }
}

async function getVendorOrder(req,res){
    let response = {};
    const {id,vendorId} = req.query;
    let query = {};
    try{
        if(id) query._id = id;
        if(vendorId) query.vendorId = vendorId;

        const vendorOrders = await vendorOderModel.find(query);
        const data = id ? vendorOrders[0] : vendorOrders;

        response = {message: 'success', status:200, data};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.statue(500).json(response);
    }
}


module.exports = {
    createOrder,
    putOrder,
    getOrder,
    getVendorOrder
}