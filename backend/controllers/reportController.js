
const {Report} = require("../models/PSchema");
const {user} = require("../models/PSchema");



exports.addReport= async(req,res) =>{
    try {
        const{productId, description}  = req.body;
        const userId = req.user.id;
            
        const newReport = new Report({
           product:productId,
           user:userId,
           description
        });
         await newReport.save();
         res.status(200).json({message:"Report submitted successfully"})
        
    } catch (error) {
        console.log(error);
        
        res.status(400).json({message:"Falid to Failed"});
    }
   
}


exports.getAllReport = async(req,res) =>{
     try {
         const reports= await Report.find().populate("product","title").populate("user","name");
         res.status(200).json(reports)

     } catch (error) {
        res.status(400).json({message:"Failed to fetch reports", error});
     }
}