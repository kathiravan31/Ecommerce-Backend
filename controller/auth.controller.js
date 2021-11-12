const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userModel = require('../models/User');

function generateToken(id, email){
    return JWT.sign({id, email},'secret')
}

async function login(req,res){
    let response = {};
    const {email, password} = req.query;
    try{
        if(!email){
            response = {message: 'email is required', status: 400};
            return res.status(400).json(response);
        }
        else if(!password){
            response = {message: 'password is required', status: 400};
            return res.status(400).json(response);
        }
        const user = await userModel.findOne({email});
        if(!user){
            response = {message: 'user not found', status: 404};
            return res.status(404).json(response);
        }
        else if(user){
            let match = await bcrypt.compare(password,user.password);
            if(!match){
                response = {message: 'password not match', status: 400};
                return res.status(400).json(response);
            }
            const token = generateToken(user._id,user.email);
            const data = {
                token,
                ...user._doc
            }
            delete data.password
            response = {message: 'success', status: 200, data};
            return res.status(200).json(response);
        }
    }
    catch(err){
        console.log(err);
        response = {message: 'System error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function register(req,res){
    let response = {};
    const {first_name,last_name,mobile_number,email,password} = req.body;
    try{
        if(!email){
            response = {message: 'email is required', status: 400};
            return res.status(400).json(response);
        }
        else if(!password){
            response = {message: 'password is required', status: 400};
            return res.status(400).json(response);
        }
        else if(!mobile_number){
            response = {message: 'mobile number is required', status: 400};
            return res.status(400).json(response);
        }
        else if(!first_name){
            response = {message: 'first name is required', status: 400};
            return res.status(400).json(response);
        }

        const user = await userModel.findOne({email});
        if(user){
            response = {message: 'email is already taken', status: 400};
            return res.status(400).json(response);
        }

        let setObj = {
            first_name,
            email,
            password,
            mobile_number
        };
        if(last_name){
            setObj.last_name = last_name
        }
        const newUser = new userModel(setObj);
        const saveUser = await newUser.save();

        const token = generateToken(saveUser._id,email);
        const data = {
            token,
            ...saveUser._doc
        }
        delete data.password;
        response = {message: 'user created', status: 201, data};
        return res.status(201).json(response);
    }
    catch(err){
        response = {message: 'System error', status: 500, data: err.message};
        return res.status(500).json(response);
    }
}

async function forgorPassword(req,res){
    let response = {};
    const {email,password} = req.body;
    try{
        if(!email){
            response = {message: 'email is required', status: 400};
            return res.status(400).json(response);
        }
        else if(!password){
            response = {message: 'password is required', status: 400};
            return res.status(400).json(response);
        }

        const user = await userModel.findOne({email});
        if(!user){
            response = {message: 'user not found', status: 404};
            return res.status(404).json(response);
        }
        const hashpassword = await bcrypt.hash(password,10)
        const newpassword = await userModel.updateOne({email},{password:hashpassword});
        if(newpassword){
            response = {message: 'success', status: 200};
            return res.status(200).json(response);
        }

        response = {message: 'somethink went wrong', status: 500};
        return res.status(500).json(response);
    } 
    catch(err){
        response = {message:'system error', status:500,data: err.message};
        return res.status(500).json(response);
    }
}


module.exports = {
    login,
    register,
    forgorPassword
}