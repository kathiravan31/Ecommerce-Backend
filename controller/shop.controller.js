const shopModel = require('../models/Shop');


async function createShop(req,res){
    let response = {};
    let temp = []
    const {name, 
        type, 
        mobile, 
        landmark, 
        street, 
        city, 
        state, 
        country, 
        pincode} = req.body;

    try{
        if(!name) temp.push('name')
        if(!type) temp.push('type')
        if(!mobile) temp.push('mobile')
        if(!landmark) temp.push('landmark')
        if(!street) temp.push('street')
        if(!city) temp.push('city')
        if(!state) temp.push('state')
        if(!country) temp.push('country')
        if(!pincode) temp.push('pincode')

        if(temp.length > 0){
            response = {message:'please give required details', state: 400, data:temp};
            return res.status(400).json(response);
        }

        req.body.vendorId = req.user.id
        const newShop = new shopModel(req.body);
        const save = await newShop.save();

        response = {message: 'Shop created', status: 201, data: save};
        return res.status(201).json(response);
    }
    catch(err){
        resposne = {message: 'System error', status:500, data:err.message};
        return res.status(500).json(response);
    }
}

async function getShop(req,res){
    let response = {};
    const {id,vendorId} = req.query;
    try{
        let query = {};
        if(id){
            query._id = id;
        }
        if(vendorId){
            query.vendorId = vendorId;
        }
        const shop = await shopModel.find(query);
        const data = id ? shop[0] : shop || {};
        response = {message:'success', status: 200, data};
        return res.status(200).json(response)
    }
    catch(err){
        response = {message:'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}


async function putShop(req,res){
    let response = {};
    const {name, 
        type, 
        mobile, 
        landmark, 
        street, 
        city, 
        state, 
        country, 
        pincode} = req.body;
    const {id} = req.query;
    let setObj = {};
    try{
        if(!id){
            response = {message: 'shopId is need for update shop details', status: 400};
            return res.status(400).json(response);
        }
        if(name) setObj.name = name
        if(type) setObj.type = type
        if(mobile) setObj.mobile= mobile
        if(landmark) setObj.landmark = landmark
        if(street) setObj.street = street
        if(city) setObj.city = city
        if(state) setObj.state = state
        if(country) setObj.country = country
        if(pincode) setObj.pincode = pincode

        if(Object.keys(setObj).length > 0){
            const shop = await shopModel.updateMany({_id: id}, {$set: setObj});
            response = {message:'success', state: 200, data:shop};
            return res.status(200).json(response);
        }
        response = {message:'please give required details', state: 400, data:temp};
        return res.status(400).json(response);
    }
    catch(err){
        resposne = {message: 'System error', status:500, data:err.message};
        return res.status(500).json(response);
    }
}

async function deleteShop(req, res){
    let response = {};
    const {id} = req.query;
    try{
        if(!id){
            response = {message:'shopId is need for delete', status: 400};
            return res.status(400).json(response);
        }
        await shopModel.remove({_id:id});
        response = {message: 'success', status: 200};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'System error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}



module.exports = {
    createShop,
    getShop,
    putShop,
    deleteShop
}