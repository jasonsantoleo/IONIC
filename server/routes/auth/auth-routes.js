const express=require('express')
const { loginUser, registerUser, checkAuth, logOut } = require('../../controller/auth/authcontroller')

const router=express.Router()

router.post('/login',loginUser)
router.post('/register',registerUser)
router.post('/logout',logOut)
router.post('/checkAuth',checkAuth,(req,res)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        message:"authenticated user",
        user:user
    })
})

module.exports = router