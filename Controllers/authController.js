const USER=require("../Model/User");
const { success, error } = require("../utils");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const SignUpController=async (req,res)=>{
    try{
        const{name,email,password}=req.body;
        if(!name||!email||!password){
            return res.send(success(404,'please enter required details'))
        }
        const HashedPassword=await bcrypt.hash(password,10);
        const nuser= await USER.create({
            name,
            email,
            password:HashedPassword
        })
        console.log(nuser);
        return res.send(success(200,'user has been created'))

    }
    catch(err){
        return res.send(error(500,err))

    }
   
}
const loginController=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.send(success(404,'please enter required details'))
        }
        const userData=await USER.findOne({email});

        if(!userData){
            return res.send(error(404,'user is not present'));
        }
        const isPassword=await bcrypt.compare(password,userData.password);
        if(!isPassword){
            return res.send(error(503,'password incorrect'))
        }
        const accessToken=generateAccessToken({
            _id:userData._id
        })
        console.log(accessToken);
        const refreshToken=refreshAccessToken({
            _id:userData._id
        })

        return res.send(success(202,{accessToken}));


    

    }
    catch(err){

    }
}
const generateAccessToken= (data)=>{
    try{
    return jwt.sign(data,process.env.ACCESS_TOKEN_KEY,{
        expiresIn:'30m'
    })
}
catch(err){
    return res.send(error(404,err))
}
}
const refreshAccessToken=(data)=>{
    try{
        return jwt.sign(data,process.env.REFRESH_TOKEN_KEY,{
            expiresIn:'1y'
        })

    }
    catch(err){
        return res.send(error(404,err))
        

    }

}
module.exports={SignUpController,loginController}