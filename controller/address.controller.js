const addressModel = require('../models/Address');


async function postAddress(req,res){
    let response = {};
    const {
        landmark,
        street,
        city,
        state,
        country,
        pincode
    } = req.body;
    let temp = [];
    try{
        if(!landmark) temp.push('landmark');
        if(!street) temp.push('street');
        if(!city) temp.push('city');
        if(!state) temp.push('state');
        if(!country) temp.push('country');
        if(!pincode) temp.push('pincode');

        if(temp.length > 0){
            response = {message: 'please give required details', status: 400, data: temp};
            return res.status(400).json(response);
        }

        req.body.userId = req.user.id;
        const newAddress = new addressModel(req.body);
        const save = await newAddress.save();

        response = {message: 'success', status: 201, data: save};
        return res.status(201).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function getAddress(req,res){
    let response = {};
    const {id, userId} = req.query;
    let query = {};
    try{
        if(id){
            query._id = id;
        }
        else if(userId){
            query.userId = userId;
        }

        const address = await addressModel.find(query);
        const data = id ? address[0] : address || {};
        
        response = {message: 'success', status: 200, data};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function putAddress(req,res){
    let response = {};
    const {id} = req.query;
    const {
        landmark,
        street,
        city,
        state,
        country,
        pincode,
        active
    } = req.body;

    let setObj = {};
    try{
        if(landmark) setObj.landmark = landmark;
        if(street) setObj.street = street;
        if(city) setObj.city = city;
        if(state) setObj.state = state;
        if(country) setObj.country = country;
        if(pincode) setObj.pincode = pincode;
        if(active) setObj.active = active;

        const address = await addressModel.updateMany({_id:id},{$set: setObj});

        response = {message: 'success', status: 200, data: address};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function deleteAddress(req,res){
    let response = {};
    const {id} = req.query;
    try{
        if(!id){
            response = {message: 'id is required for delete address', status: 400};
            return res.status(400).json(response);
        }
        await addressModel.remove({_id: id});
        response = {message: 'successfully delete', status: 200};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}


module.exports = {
    postAddress,
    getAddress,
    putAddress,
    deleteAddress
}