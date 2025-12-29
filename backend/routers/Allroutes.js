const express = require('express');
const router = express.Router();
const {register,data,login,profile,removeUser} = require("../controllers/authController");
const {addProd, getAllProducts,getSingleProduct,updateProduct,deleteProduct,delprod} = require("../controllers/prodController");
const {addToCart,getCart,removeCart} = require("../controllers/cartController");
const {placeOrder, verifyOrder,userOrders,listOrders,updateStatus} = require("../controllers/orderController");
const protect = require("../middleware/authmidl");
const {addReport,getAllReport} = require("../controllers/reportController");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");


//for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/Uploads');
    },
    filename: function (req, file, cb) {
     crypto.randomBytes(12,function(err,bytes) {
        if(err) return cb(err);
        const fn = bytes.toString("hex") + path.extname(file.originalname);
        // cb(null, file.fieldname + '-' + uniqueSuffix);
        cb(null,fn);
     })
      
    }
  })
  
  const upload = multer({ storage: storage })


//for login and register
router.post("/register",register);
router.get("/all", data);
router.post("/login", login);
router.get("/profile", protect,profile);
router.delete("/removeuser/:id",removeUser);

// for product 
router.post("/addProd",protect, upload.single("image"),addProd);
router.get("/allProd", getAllProducts);
router.get("/SProd/:id",getSingleProduct);
router.put("/updateProd/:id",protect,updateProduct);
router.delete("/deleteProd/:id",protect,deleteProduct);
router.delete("/delprod/:id",delprod)


//for cart 
router.post("/addToCart", protect,addToCart);
router.post("/removeCart", protect,removeCart)
router.get("/getCart", protect,getCart)


//for order
router.post("/placeOrder", protect, placeOrder);
router.post("/verify", verifyOrder);
router.get("/userOrders",protect,userOrders);
router.get("/listOrders",listOrders);
router.post("/status",updateStatus);

//for reports
router.post("/addReport",protect,addReport);
router.get("/allreport", getAllReport)

module.exports =  router