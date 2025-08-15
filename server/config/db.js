const mongoose = require('mongoose');

const ConnectDB = async ()=>{
    const URI = process.env.MONGODB_URI;
    try{ 
        await mongoose.connect(URI);
        console.log("MongoDB Connected Successfully!");
    }catch(err){
        console.log(`Error Connecting MongoDB: ${err.message}`)
    }
}

module.exports = ConnectDB;