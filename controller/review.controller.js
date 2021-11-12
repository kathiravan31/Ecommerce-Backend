const reviewModel = require('../models/Review');


async function postReview(req,res){
    let response = {};
    const {
        productId,
        message
    } = req.body;

    let temp = [];
    try{
        if(!productId) temp.push('productId');
        if(!message) temp.push('message');

        if(temp.length > 0){
            response = {message: 'please give required details', status:400, data: temp};
            return res.status(400).json(response);
        }
        req.body.userId = req.user.id;
        const review = new reviewModel(req.body);
        const save = await review.save();

        response = {message: 'success', status: 201, data:save};
        return res.status(201).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function getReview(req,res){
    let response = {};
    const {productId} = req.query;
    try{
        if(!productId){
            response = {message: 'productId is need', status: 400};
            return res.status(400).json(response);
        }
        const reviews = await reviewModel.find({productId});
        response = {message: 'success', status: 200, data: reviews};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function putReview(req,res){
    let response = {};
    const {id} = req.query;
    const {message} = req.body;
    let setObj = {};
    try{
        if(!id){
            response = {message: 'id is required for update', status: 400};
            return res.status(400).json(response);
        }
        if(message){
            setObj.message = message;
        }
        const review = await reviewModel.updateOne({_id:id},{$set: setObj});
        response = {message: 'success', status: 200, data: review};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function deleteReview(req,res){
    let response = {};
    const {id} = req.query;
    try{
        if(!id){
            response = {message: 'id is required for delete', status: 400};
            return res.status(400).json(response);
        }
        const reviews = await reviewModel.remove({_id:id});
        response = {message: 'success', status: 200};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

module.exports = {
    postReview,
    getReview,
    putReview,
    deleteReview
}

