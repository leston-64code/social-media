const executeQuery = require("../utils/executeQuery");


exports.uploadProfilePicture = async (req, res, next) => {
    try {
        const userId = req.userId;
        const profilePicLink = req.body.profilePicLink; 
        const sql = `UPDATE User SET profile_pic_link = ? WHERE id = ?`;
        await executeQuery(sql, [profilePicLink, userId]);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.removeProfilePicture = async (req, res, next) => {
    try {
        const userId = req.userId; 
        const sql = `UPDATE User SET profile_pic_link = NULL WHERE id = ?`;
        await executeQuery(sql, [userId]);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.getUserProfile = async (req, res, next) => {
    try {
        const userId = req.userId;
        const sql = `SELECT * FROM User WHERE id = ?`;
        const user = await executeQuery(sql, [userId]);
        res.status(200).json({ success: true, user: user[0] });
    } catch (error) {
        next(error);
    }
};

exports.addUserBio = async (req, res, next) => {
    try {
        const userId = req.userId; 
        const bio = req.body.bio; 
        const sql = `UPDATE User SET bio = ? WHERE id = ?`;
        await executeQuery(sql, [bio, userId]);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};

exports.updateUserBio = async (req, res, next) => {
    try {
        const userId = req.userId; 
        const bio = req.body.bio; 
        const sql = `UPDATE User SET bio = ? WHERE id = ?`;
        await executeQuery(sql, [bio, userId]);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
