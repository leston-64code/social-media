const bcrypt = require('bcrypt');
const executeQuery = require('../utils/executeQuery');
const { checkEmailExists } = require('../utils/checkEmailExists');

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

exports.signUpUser = async (req, res, next) => {
    try {
        // const { name, email, password, userName } = req.body;

        // const emailExists = await checkEmailExists(email);
        
        // if (emailExists) {
        //     return res.status(400).json({ error: 'Email already registered' });
        // }

        // const hashedPassword = await hashPassword(password);

        // const sql = `INSERT INTO User (name, email, password, user_name) VALUES (?, ?, ?, ?)`;
        // const values = [name, email, hashedPassword, userName];

        // await executeQuery(sql, values);
        
        // let user=await executeQuery('SELECT * FROM User where email= ? ;',[email])

        // return res.status(200).json({
        //     success: true,
        //     msg: "User creation successful",
        //     user:user[0]
        // });
        return res.status(200).json({
            success:false
        })
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const sql = `SELECT * FROM User WHERE email = ?`;
        const values = [email];

        const results = await executeQuery(sql, values);

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];

        const passwordMatch = await comparePasswords(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        return res.status(200).json({
            success: true,
            msg: "Login successful",
            user
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch user' });
    }
};
