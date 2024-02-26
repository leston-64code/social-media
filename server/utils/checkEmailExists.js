const executeQuery = require("./executeQuery");

exports.checkEmailExists=async(email)=> {
    const sql = `SELECT COUNT(*) AS count FROM User WHERE email = ?`;
    const values = [email];
    const result = await executeQuery(sql, values);
    return result[0].count > 0;
}