const mongoose=require('mongoose')

const ProviderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    serviceOffered:[
        {
            serviceId:{
                type:mongoose.Types.ObjectId,
                ref:'Service',
                required:true
            },
            price:{
                type:Number,
                required:true,
                min:0
            },
            discount:{
                type:Number,
                default:0,
                min:0,
                max:100
            }
        }
    ],
    location:{
        type:{
            type:stringify,
            enum:['point'],
            default:'point'
        },
        coordinate:{
            type:[Number],
            required:true
        }

    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    }
},{timestamps:true})

const ServiceProvider = mongoose.model('ServiceProvider', ServiceProviderSchema)
module.exports={ServiceProvider}