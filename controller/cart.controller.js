const cartModel = require('../models/Cart');

async function postCart(req,res){
    let response = {};
    let temp = [];
    const {
        productId,
        quantity,
        amount,
    } = req.body;
    try{
        if(!productId) temp.push('productId')
        if(!quantity) temp.push('quantity')
        if(!amount) temp.push('amount')

        if(temp.length > 0){
            response = {message: 'required data is need', status: 400};
            return res.status(400).json(response);
        }
        req.body.userId = req.user.id;
        const cart = new cartModel(req.body);
        const save = await cart.save();

        response = {message: 'success', status: 201, data: save};
        return res.status(201).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function getCart(req,res){
    let response = {};
    const {id} = req.query;
    let query = {};
    try{
        if(id){
            query.userId = id;
        }
        const carts = await cartModel.find(query);
        response = {message: 'success', status: 200, data:carts};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json()
    }
}

async function putCart(req,res){
    let response = {};
    const {id} = req.query;
    const {quantity} = req.body;
    let setObj = {};
    try{
        if(!id){
            response = {message: 'id is required for update', status: 400};
            return res.status(400).json(response);
        }
        if(quantity){
            setObj.quantity = quantity;
        }
        const cart = await cartModel.updateMany({_id:id},{$set: setObj});
        response = {message: 'success', status: 200};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function deleteCart(req,res){
    let response = {};
    const {id} = req.query;
    try{
        if(!id){
            response = {message: 'id is required for delete cart', status: 400};
            return res.status(400).json(response);
        }
        await cartModel.remove({_id:id});
        response = {message: 'successfully delete', status: 200};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return response.status(500).json(response);
    }
}

module.exports = {
    postCart,
    putCart,
    deleteCart,
    getCart
}