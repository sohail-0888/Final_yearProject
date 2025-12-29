const {Carts, user}  = require("../models/PSchema");



exports.addToCart = async (req, res) => {
   
    try {

        if (!req.body.userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        let userData = await Carts.findOne({ user: req.body.userId });

        if (!userData) {
            // Agar user ka cart nahi mila toh naya cart create karo
            userData = new Carts({ user: req.body.userId, items: [] });
        }

        let cartData = userData.items;

        let itemIndex = cartData.findIndex(item => item.product.toString() === req.body.itemId);

        if (itemIndex === -1) {
            // Agar item pehle se cart mein nahi hai, toh add karo
            cartData.push({ product: req.body.itemId, quantity: 1 });
        } else {
            // Agar item already cart mein hai, toh quantity update karo
            cartData[itemIndex].quantity += 1;
        }

        await userData.save();
        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};



exports.removeCart = async (req,res) => {
    
     try {
        let usercart = await Carts.findOne({user:req.body.userId});
        if(!usercart) return res.json({success:false, message:"No Cart found"});
          
        let cartData = usercart.items;

        let itemIndex = cartData.findIndex(item => item.product.toString() === req.body.itemId);
        if(itemIndex === -1 )
        {
            return res.json({success:false, message:"Item not found in cart"});
        }

        if(cartData[itemIndex].quantity > 1){
            cartData[itemIndex].quantity -= 1;
        }
        else{
            cartData.splice(itemIndex, 1);
        }
        await usercart.save();
        res.json({success:true, message:"Item removed from cart"});

     } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error removing item from cart"});
        
     }
}



exports.getCart = async (req,res) =>{
    try {
        const userId = req.user._id || req.user.id;  
        const userCart = await Carts.findOne({ user: userId });
    
        if(!userCart)
        {
            return res.json({success:false, message:"No cart found"});
        }
     
        res.json({success:true, cart:userCart.items});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error getting cart"});
    }
  
}


