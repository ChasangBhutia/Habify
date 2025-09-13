const userModel = require('../models/userModel')

module.exports.searchUser = async (req, res)=>{
    const { email } = req.query;
    if(!email) return res.status(400).json({success:false, error:"Email is required"});
    try{
        const users = await userModel.find({ email }).select('-password');
        return res.status(200).json({success:true, message:"Users found", users});
    }catch(err){
        console.error(`Error searching users: ${err.message}`);
        return res.status(500).json({success:false, error:"Womethig went wrong"});
   }
}