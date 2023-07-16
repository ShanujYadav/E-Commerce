import express  from "express"
import requireLogin from "../middleware/requireLogin.js"
const cartRouter=express.Router()
import addProduct from "../model/addProduct.js"
import cart from '../model/cart.js'


cartRouter.post("/addToCart/:Piid",requireLogin,(req,res)=>{

    const Piid=req.params.Piid
    addToCart(Piid)
    async function addToCart(Piid){

        const Product= await addProduct.findById(Piid)
      //  console.log(Product)
           if(Product.Punit>0){

             findIncart(Product.id)
            async function findIncart(id){
          //console.log(id)
                const prod= await cart.find({Pid:id})
                
                if(prod.length===0){
                   const data=new cart({Pid:Product._id,Pname:Product.Pname,Pcategory:Product.Pcategory,Pprice:Product.Pprice,Pquantity:1,Ppic:Product.Ppic,sellerName:Product.sellerName})
                   data.save()
                     .then(result=>{
                      if(result){
                        res.json("Added to cart")
                      }
                      else{
                        res.json("error")
                      }
                       
                     })
                }
                else{
                 // console.log(prod)
                  let qty=prod[0].Pquantity+1
                 
                 console.log(prod[0]._id)
                 cart.findByIdAndUpdate(prod[0]._id,{Pquantity:qty})
                   .then(result=>{
                    if(result){
                      res.json("increase")
                      
                    }
                    else res.json("not increase")
                   })
                   
             
            }
        
          }
        }

           else{
            res.json("out of stock")
           }
     
        

    }
    
})

cartRouter.post("/decrease/:id",requireLogin,(req,res)=>{
  const id=req.params.id
  findIncart(id)
  async function findIncart(id){
    const prod=await cart.findById(id)
    const qty=prod.Pquantity-1
    cart.findByIdAndUpdate(prod._id,{Pquantity:qty})
    .then(result=>{
     if(result){
       res.json("decrease")
       
     }
     else res.json("not decrease")
    })
  }

})

cartRouter.get("/showCart",requireLogin,(req,res)=>{
  cart.find()
  .then(data=>res.json(data))
})

cartRouter.post('/cancelFromCart',requireLogin,(req,res)=>{

cancelFromCart(req.body.Pid)
async  function cancelFromCart(Pid){
  //console.log(Pid)
   const data=  await cart.findByIdAndDelete(Pid)
   
  //console.log(data)
   if(data){
    res.json('ok')
   }

   else{
    res.json("error")
   }

  }
})
export default cartRouter
    