const productModel = require('../models/Product');

async function postProduct(req,res){
    let response = {};
    let temp = [];
    const {
        title,
        type,
        image,
        images,
        categories,
        size,
        color,
        price,
        description,
        discount,
        specification,
        highlights
    } = req.body;
    try {
        if(!title) temp.push('title')
        if(!type) temp.push('type')
        if(!image) temp.push('image')
        if(!images) temp.push('images')
        if(!categories) temp.push('categories')
        if(!size) temp.push('size')
        if(!color) temp.push('color')
        if(!price) temp.push('price')
        if(!description) temp.push('description')
        if(!specification) temp.push('specification')
        if(!highlights) temp.push('highlights')

        if(temp.length > 0){
            response = {message: 'please give required data', status: 400, data:temp};
            return res.status(400).json(response);
        }

        req.body.vendorId = req.user.id;
        const newProduct = new productModel(req.body);
        const save = await newProduct.save();

        response = {message:'success', status: 201, data: save};
        return res.status(201).json(response);
    }
    catch(err){ 
        response = {message:'System error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function getProducts(req,res){
    let response = {};
    const {id} = req.query;
    let query = {};
    if(id){
        query._id = id;
    }
    try{
        const products = await productModel.find(query);
        const data = id ? products[0] : products || {}
        response = {message: 'success', status: 200, data};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', data: err.message};
        return res.status(500).json(response);
    }
}

async function putProduct(req,res){
    let response = {};
    const {id} = req.query;
    const {
        title,
        type,
        image,
        images,
        categories,
        size,
        color,
        price,
        description,
        discount,
        specification,
        highlights
    } = req.body;
    try{
        let setObj={};
        
        if(!id){
            response = {message:'productId is need for update', status: 400};
            return res.status(400).json(response);
        }
        if(title) setObj.title = title
        if(type) setObj.type = type
        if(image) setObj.image = image
        if(images) setObj.images = images
        if(categories) setObj.categories = categories
        if(size) setObj.size = size
        if(color) setObj.color = color
        if(price) setObj.price = price
        if(discount) setObj.discount = discount
        if(description) setObj.description = description
        if(specification) setObj.specification = specification
        if(highlights) setObj.highlights = highlights

        if(Object.keys(setObj).length > 0){
            const product = await productModel.updateMany({_id:id},{$set: setObj});
            response = {message: 'success', status: 200, data: product};
            return res.status(200).json(response);
        }
        response = {message: 'please give any data', status: 400};
        return res.status(400).json(response);
    }
    catch(err){
        response = {message: 'System error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function deleteProduct(req,res){
    let response = {};
    const {id} = req.query;
    try{
        if(!id){
            response = {message:'productId is need for delete', status: 400};
            return res.status(400).json(response);
        }
        await productModel.remove({_id:id});
        response = {message: 'success', status: 200};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'System error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

module.exports = {
    postProduct,
    getProducts,
    putProduct,
    deleteProduct
}