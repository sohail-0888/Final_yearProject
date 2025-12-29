const {user} = require("../models/PSchema")
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");




exports.register = async(req,res)=>{
    try {
       
        const {name,email,password,address,phoneNo,role} = req.body;
         const exituser = await user.findOne({email});
         
         if(exituser)
         {
            return res.status(400).json({error:"User is Already exits"});
         }
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password,salt);
        const userAdded =  await user.create({
            name:name,
            email:email,
            password:hashPassword,
            phoneNo:phoneNo,
            address:address,
            role:role
        })
        res.status(200).json(userAdded);
        
     } catch (error) {
        res.status(400).json({error:error.message});
     }

}


exports.login = async(req,res) =>{
    try {
         const { email,password} = req.body;
           
         const chkemail = await user.findOne({email});
         console.log(chkemail);
         
         if(!chkemail) return res.status(400).json({error: "Invalid email"})

          const isMatch =  await bcrypt.compare(password,chkemail.password);
          if(!isMatch)
          {
            return res.status(400).json({error:"invalid email or password"});
          }
          
           const token = jwt.sign({id:chkemail._id}, process.env.JWT_SECRET,{expiresIn: "1h"});
           const { password: pwd, ...userWithoutPass } = chkemail._doc;
            res.status(200).json({message:"LogIn successful", token, user: userWithoutPass});

          
    } catch (error) {
      res.status(500).json({error:error.message});
    }
}


 exports.profile = async(req,res) =>{
     const usercheck = await user.findById(req.user._id).select("-password");
     res.status(200).json(usercheck);
 }

exports.data = async (req,res) =>{
    try {
        const userdata = await user.find();
        res.status(200).json(userdata)
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

exports.removeUser = async(req,res) =>{
    try {
        const  removedata = await user.findByIdAndDelete(req.params.id);
        if(!removedata)
        {
            return res.status(400).json({error:"user not found"});
        }
        res.status(200).json( {message:  "User remove successfully" ,removedata});
    } catch (error) {
         res.status(400).json({error:error.message})
    }
}