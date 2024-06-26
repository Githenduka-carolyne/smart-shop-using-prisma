import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();



router.get("/", async(req,res)=>{ 
  try{

    const products=await prisma.product.findMany({

       
        select:{
          id:true,
          productTitle:true,
            productDescription:true,
            productCost:true,
            onOffer:true  
        }
      
    })
      res.status(200).json({message:"Product retrieved successfully" ,products})
  }
  catch{
     res.status(500).json({message:"error has occured"})
  }

})

router.get("/:id", async(req,res)=>{
  try{
  const id=req.params.id;
    const products=await prisma.product.findFirst({

       where:{id},
        select:{
          id:true,
          productTitle:true,
            productDescription:true,
            productCost:true,
            onOffer:true  
        }
      
    })
      if(!products){
        res.status(404).json({message:"Product not found" })
      }else{
      res.status(200).json({message:"Product retrieved successfully" ,products})}
  }
  catch{
    res.status(500).json({message:"error has occured"})
  }

})

router.delete("/:id", async(req,res)=>{
  try{
const id=req.params.id;
    const products=await prisma.product.delete({
    where:{id},
       
        select:{
          id:true,
          productTitle:true,
            productDescription:true,
            productCost:true,
            onOffer:true  
        }
      
    })
    if(!products){
        res.status(404).json({message:"No  product with that id found"})
      }else{
      res.status(200).json({message:"Product deleted successfully" ,products})}
  }
  catch(error){
       res.status(500).json({message:"error has occured"})
  }

})

router.post("/", async(req,res)=>{
           const{productTitle,
            productDescription,
            productCost,
            onOffer}=req.body
            if (!productTitle ||!productDescription|| !productCost || typeof onOffer === 'undefined') {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
   try{
    const products=await prisma.product.create({

        data:{
            productTitle,
            productDescription,
            productCost,
            onOffer
        },
        select:{
          
          productTitle:true,
            productDescription:true,
            productCost:true,
            onOffer:true  
        }
      
    })
      res.status(200).json({message:"Product created successfully" ,products})
  }
  catch(err){
     res.status(500).json({message:"error has occured"})
  
  }

})

router.patch("/:id", async(req,res)=>{
   const id = req.params.id;
    const{productTitle,
            productDescription,
            productCost,
            onOffer}=req.body;
         try{
            let updateproducts;
            if(productTitle){(
               updateproducts = await prisma.product.update({
                where:{id},
                data:{productTitle:productTitle}
               })
              )
            }
             if(productDescription){(
               updateproducts =await prisma.product.update({
                where:{id},
                data:{productDescription:productDescription}
              })
            )
            }
          
             if(productCost){(
               updateproducts = await prisma.product.update({
                where:{id},
                data:{productCost:productCost}
              })
            )
            }
             if(onOffer){(
               updateproducts =await prisma.product.update({
                where:{id},
                data:{onOffer:onOffer}
              })
            )
            }
          res.status(200).json({message:"Product updated successfully" ,updateproducts})
          }
          catch(err){
            res.status(500).json({message:"error has occured"})
          }

})

export default router;