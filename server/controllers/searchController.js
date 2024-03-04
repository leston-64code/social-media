const executeQuery = require('../utils/executeQuery');

exports.getUsers=async(req,res,next)=>{
    try {
        const {pattern}=req.body
        let sql="SELECT user_id,name,email,user_name,compressed_full_pic FROM User WHERE name LIKE CONCAT(?, '%')";
        let users=await executeQuery(sql,[pattern]);
        return res.status(200).json({
            success:true,
            users
        })
    } catch (error) {
        next(error)
    }
}
