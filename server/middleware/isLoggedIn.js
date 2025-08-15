const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next)=>{
    try{
        let token = req.cookies.token;
        if(!token) return res.status(401).json({success:false, error:"Access denied. No token provided"});
    
        let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        console.log(`Error: ${err.message}`);
        return res.status(403).json({success:false, error:"Invalid or expired token"});
    }
}

module.exports = isLoggedIn;