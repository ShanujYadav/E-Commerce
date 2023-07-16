import mongoose from "mongoose";
let account=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true
    }
})
account=mongoose.model("Account",account)
export default account;