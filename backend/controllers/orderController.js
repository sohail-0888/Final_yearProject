const {Orders,user, Product}  = require("../models/PSchema")


require("dotenv").config();
const Stripe = require('stripe');


// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



exports.placeOrder = async (req, res) => {
    // console.log("User from token:", req.user);  
    const frontend_url = "http://localhost:5174";
  
    try {
      const newOrder = new Orders({
        user: req.user.id,
        items: req.body.items,
        amount: req.body.amount,
        userDetail: {
            name:`${req.body.firstName} ${req.body.lastName}`,
            street: req.body.street,
            city: req.body.city,
            state:req.body.state,
            zipCode: req.body.zipCode,
            country: req.body.country,

        },
        status: "Pending",
        payment: req.body.paymentMethod === "Stripe" ? false : true,
      });
  
      const savedOrder = await newOrder.save();
  // Checking saved order
        console.log("Order saved:", savedOrder);
      await user.findByIdAndUpdate(req.user._id, { cart: {} });

      if(req.body.paymentMethod === "COD"){
        console.log("COD order placed", newOrder._id);
        return res.json({success:true, orderId:newOrder._id});
      }
  
      // Line items create karo
      const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "USD",
          product_data: {
            name: item.product.title, // Make sure frontend se item.product mil raha hai
          },
          unit_amount: Math.round(item.product.price * 100 / 277) // price cents me
        },
        quantity: item.quantity,
      }));
  
      // Delivery charges item manually add karo
      line_items.push({
        price_data: {
          currency: "USD",
          product_data: {
            name: "Delivery charges",
          },
          unit_amount:  Math.round(2 * 100 / 277) // 2$ delivery charges
        },
        quantity: 1,
      });
  
      // Stripe Checkout session create
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        payment_method_types: ['card'],
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      });
  
      res.json({ success: true, session_url: session.url });
  
    } catch (error) {
      console.error("Place Order Error:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  };
  

exports.verifyOrder = async ( req,res)  =>{
        const{orderId,success}  = req.body;
        try {
            if(success == "true")
            {
                await Orders.findByIdAndUpdate(orderId,{payment:true});
                res.json({success:true, message: "Paid"})
            }
            else{
                await orderModel.findByIdAndDelete(orderId);
                res.json({success:false, message:"Not Paid"})
            }
        } catch (error) {
            console.log(error);
            res.json({success:false, message:"Error"})
            
        }
  }


  ///userorder for frontend 

   exports.userOrders = async(req,res) =>{
                try {
                  const orders = await Orders.find({user: req.user.id});
                  res.json({success:true,data:orders})
                } catch (error) {
                  console.log(error);
                  res.json({success:false, message:error})
                  
                }
  }


 //Listing orders for admin panel

   exports.listOrders = async(req,res) =>{
    try {
        const listorder = await Orders.find({userId: req.body._id});
        res.json({success:true, data:listorder})
    } catch (error) {
       console.log(error);

       res.json({success:false, message:error})
    }
   }


   //api for updating order status
    exports.updateStatus = async(req,res) =>{
        try {
           await Orders.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
           res.json({success:true,message:"Status Updated"})
        } catch (error) {
           console.log(error);
           res.json({success:false, message:"Error"})  
        }
    }