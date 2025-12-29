const mongoose =  require('mongoose');

//user schema
const  userSchema = new mongoose.Schema({
     name:{type:String, require:true},
     email:{type:String, require:true},
     password:{type:String, require:true},
     address: {type:String, require:true},
     phoneNo:{type:String, require:true},
     role: {type:String,enum:["Buyer", "Seller"], default:"Buyer"},
} ,{timestamps:true}) 



//product schema
  const productSchema = new mongoose.Schema({
     title:{type:String, required:true},
     description:{type:String, required:true},
     price:{type:Number,required:true},
     category:{type:String,enum:["cars","bikes","mobiles","Electronics","Furniture","Property","Fashion","Beauty"]},
     image:{type:String, required:true},
     location:{type:String ,required:true},
     condition:{type:String,enum:["new","old"]},
     seller:{type: mongoose.Schema.Types.ObjectId, ref:"User",required:true},
  },{timestamps:true});


  const orderItemsSchema = new mongoose.Schema({
    product: {
      title: { type: String, required: true },  // Title of the product
      price: { type: Number, required: true },  // Price of the product
      // If you have more product fields, add them here, like `description`, `image`, etc.
    },
    quantity: { type: Number, required: true },  
  })

   
  const OrderSchema = new mongoose.Schema({
   user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
     items:{type:[orderItemsSchema], required:true},
      amount:{type:Number, required:true},
       userDetail:{
        name:{type:String, required:true},
        street:{type:String, required:true},
        city:{type:String, required:true},
        state:{type: String, required:true},
        zipCode:{type:String, required:true},
        country:{type:String, required:true},
      },
      status:{type:String, default:"Order Processing"},
      date:{type:Date, default:Date.now},
      payment:{type:Boolean,default:false},
  } , {timestamps:true})


  //for cart
  const cartItemSchema = new mongoose.Schema({
   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
   quantity: { type: Number, default: 1 }
 });
 
 const cartSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
   items: [cartItemSchema]
 }, { timestamps: true });
 

 //for report system
  const reportSystem = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description:{type:String, required:true},
    createdAt: { type: Date, default: Date.now }
  })

const user = mongoose.model("User",userSchema);
const Product =  mongoose.model("Product",productSchema);
const Orders = mongoose.model("Order", OrderSchema);
const  Carts = mongoose.model("Carts", cartSchema);
const Report = mongoose.model("Report", reportSystem);

module.exports = { user, Product, Orders, Carts, Report };

