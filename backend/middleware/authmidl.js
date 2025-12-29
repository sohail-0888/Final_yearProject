const jwt = require("jsonwebtoken");

const protect = (req,res,next) =>{
    const token = req.header("Authorization")?.replace("Bearer ", "");

    
    if(!token)  return res.status(400).json({message: "Access Denied"});

     try {
         const verified = jwt.verify(token,process.env.JWT_SECRET);
          req.user = verified;
          next();
     } catch (error) {
         res.status(400).json({message:"Invalid TOken"});
     }
    
}

module.exports = protect;