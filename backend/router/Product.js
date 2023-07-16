import express from "express"
const productRouter=express.Router()
import addProduct from "../model/addProduct.js"
import requireLogin from "../middleware/requireLogin.js"

productRouter.post("/addProduct",requireLogin,(req,res)=>{
    const {Pname,Pcategory,Pprice,Punit,Ppic,sellerName}=req.body
    if(!Pname || !Pcategory || !Pprice || !Punit || !Ppic|| !sellerName){
        res.status(422).json({err:"All field must be filled"})
    }
    else{
        const product=new addProduct({Pname,Pcategory,Pprice,Punit,Ppic,sellerName})
        product.save()
          .then(result=>{
            res.json(result)
          })
    }
})

productRouter.get("/allProduct",(req,res)=>{
  addProduct.find()
      .then(posts=>res.json(posts))
})

productRouter.get("/myProduct/:Pcategory",(req,res)=>{
   const category=req.params.Pcategory
  addProduct.find({Pcategory:category})
      .then(product=>{
          res.json(product)
      })
})

export default productRouter;