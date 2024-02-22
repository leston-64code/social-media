const bcrypt = require('bcrypt');
const mysql = require('mysql2'); 
const connection = require('../config/db');


const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};


const comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};


exports.signUpUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, userName } = req.body;

   
    const hashedPassword = await hashPassword(password);

    const sql = `INSERT INTO User (name, email, password, user_name) VALUES (?, ?, ?, ?)`;
    const values = [name, email, hashedPassword, userName];

    
    connection.query(sql, values, (error, results, fields) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
        return res.status(200).json({
            success:true,
            msg:"User creation successful",
        })
    });
});


exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    
    const sql = `SELECT * FROM User WHERE email = ?`;
    const values = [email];

   
    connection.query(sql, values, async (error, results, fields) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to fetch user' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];

      
        const passwordMatch = await comparePasswords(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        return res.status(200).json({
            success:true,
            msg:"Login successful",
            user
        })
        
    });
});
