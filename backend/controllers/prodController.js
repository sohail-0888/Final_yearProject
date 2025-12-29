const {Product} = require("../models/PSchema");




//add product

exports.addProd = async (req,res) =>{
   const{title,price,category,description,location,condition} = req.body;
   const imagePath = req.file? req.file.path : null;
    console.log(imagePath);
    
   //create a new product for received data
    try {
        const newProduct = new Product({
            title:title,
            price:price,
            category:category,
            description:description,
             image :imagePath,
             location:location,
             condition:condition,
            seller:req.user.id,
        })
        await newProduct.save();
        res.status(200).json({message:"Product addesd successfully", product:newProduct});     
    } catch (error) {
        res.status(400).json({error:error.message});
    }

}

//for getting all products
exports.getAllProducts = async  (req,res) =>{
    try {
        const allProd =  await Product.find().populate("seller", "name email phoneNo");
        res.status(200).json(allProd);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
     
}

//for getting single product
exports.getSingleProduct = async(req,res) =>{
    try {
        const products = await Product. findById(req.params.id).populate("seller", "name email phoneNo address");
        if(!products) return res.status(400).json({error:"Product not found"});
        res.status(200).json(products);      
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}


//for updating product
exports.updateProduct = async (req,res) =>{
    const {title,price, category,description} = req.body;
    try {
        const productUpdate = await Product.findByIdAndUpdate(req.params.id,{
            title:title,
            price:price,
            category:category,
            description:description,
        },{new:true});  
        if(!productUpdate) return res.status(400).json({error:"product not found"});
        res.status(200).json({message:"Product updated sucessfull", product:productUpdate});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

//for deleting product
exports.deleteProduct = async (req,res) =>{
    try {
        const prodDel = await Product.findByIdAndDelete(req.params.id);
        if(!prodDel) return res.status(400).json({error:"product not found"});
        res.status(200).json({message:"Product deleted successfully"});

    } catch (error) {
        res.status(400).json({error:error.message});
    }
}


//for deletting product for admin
exports.delprod = async (req,res) =>{
    try {
        const prodDel = await Product.findByIdAndDelete(req.params.id);
        if(!prodDel)
            return res.status(200).json({error:"Product not found"});
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}