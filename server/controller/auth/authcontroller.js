const User=require('../../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const registerUser=async(req,res)=>{
    const {email,password,userName,role}=req.body
    try {
        if(!userName || !email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill in all the fields"
            })
        }
        const checkUser=await User.findOne({userName})
        if(checkUser){
            return res.status(409).json({
                success:false,
                message:"user already exist"
            })
        }
        const hashpassword=await bcrypt.hash(password,12)
        const newUser=new User({
            userName,
            email,
            password:hashpassword,
            role:role || 'user'
        })
        await newUser.save()
        res.status(200).json({
            success:true,
            message:"successfully registered",
            role:newUser?.role
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const checkUser=await User.findOne({email})
        if(!checkUser){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const isMatchPassword=bcrypt.compare(password,checkUser.password)
        if(!isMatchPassword){
            return res.status(404).json({
                success:false,
                message:"invalid password"
            })
        }
        const token=jwt.sign({
            id:checkUser._id,
            email:checkUser.email,
            role:checkUser.role,
            userName:checkUser.userName
        },'CLIENT_SECRET_KEY',{expiresIn:"60min"})
        res.cookie('token',token,{httpOnly:true,secure:false}).json({
            success:true,
            message:"successfully logged in",
            user:{
                email:checkUser.email,
                role:checkUser.role,
                id:checkUser._id,
                userName:checkUser.userName
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}
const logOut=async(req,res)=>{
    try {
        res.clearCookie('token'.json({
            success:true,
            message:"successfully logged out"
        }))

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}
const checkAuth=async(req,res)=>{
    const token=req.cookie.token
    if(!token){
        return res.status(404).json({
            success:false,
            message:"please login first"
        })
    }
    try {
        const decoded=jwt.verify(token,'CLIENT_SECRET_KEY')
        req.user=decoded
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success:false,
            message:" Unauthorised access ! please log in "
        })
    }
}

module.exports={logOut,loginUser,registerUser,checkAuth}