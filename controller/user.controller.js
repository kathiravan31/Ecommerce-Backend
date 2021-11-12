const userModel = require('../models/User');

async function getUser(req,res){
    let response = {};
    const {id} = req.query;
    let query = {};
    try{
        if(id){
            query._id = id;
        }
        const user = await userModel.find(query).select('-password');
        const data = id ? user[0]: user

        response = {message: 'Success', status: 200, data};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function putUser(req,res){
    let response = {};
    const {id} = req.query;
    const {
        first_name,
        last_name,
        mobile_number,
        active
    } = req.body;
    let setObj = {};
    try{
        if(first_name) setObj.first_name = first_name;
        if(last_name) setObj.last_name = last_name;
        if(mobile_number) setObj.first_name = mobile_number;
        if(active) setObj.first_name = active;

        const user = await userModel.updateMany({_id:id},{$set: setObj});

        response = {message: 'success', status: 200, data: user};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function deleteUser(req,res){
    let response = {};
    const {id} = req.query;
    try{
        if(!id){
            response = {message: 'id is required', status: 400};
            return res.status(400).json(response);
        }
        await userModel.remove({_id: id});
        response = {message: 'success', status: 200};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'system error', status: 500, data:err.message};
        return res.status(500).json(response);
    }
}

async function changeStatus(req,res){
    let response = {};
    const {id} = req.query;
    const {isAdmin,isVendor} = req.body;
    let setObj = {};
    try{
        if(isAdmin) setObj.isAdmin = isAdmin;
        if(isVendor) setObj.isVendor = isVendor;

        await userModel.updateMany({_id:id},{$set: setObj});
        response = {message: 'success', status: 200};
        return res.status(200).json(response);
    }
    catch(err){
        response = {message: 'sysytem error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

module.exports = {
    getUser,
    putUser,
    deleteUser,
    changeStatus
}