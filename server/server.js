const express=require('express')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const authRouter=require('./routes/auth/auth-routes')
const app=express()
const PORT=process.env.PORT || 3000

mongoose.connect("mongodb+srv://leonjasonsanto:jason@cluster0.gwpov.mongodb.net/")
    .then((data)=>console.log("the connection is successful"))
    .catch(e=>console.log(error))

app.use(cors({
    origin:'http://localhost:5173',
    allowedHeaders:[
        'Content-Type',
        'Authorization',
        'cache-control',
        'Expires',
        'Pragma'
    ],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRouter)

app.listen(PORT,console.log(`The server is running on -> ${PORT}`))