const executeQuery = require("../utils/executeQuery");


exports.uploadProfilePicture = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const profilePicLink = req.body.profilePicLink; 
        const sql = `UPDATE User SET profile_pic_link = ? WHERE id = ?`;
        await executeQuery(sql, [profilePicLink, user_id]);
        return res.status(200).json({ success: true, message:"Profile picture uploaded" });
    } catch (error) {
        next(error);
    }
};

exports.removeProfilePicture = async (req, res, next) => {
    try {
        const user_id = req.params.user_id; 
        const sql = `UPDATE User SET profile_pic_link = NULL WHERE id = ?`;
        await executeQuery(sql, [user_id]);
        return res.status(200).json({ success: true, message:"Profile picture removed" });
    } catch (error) {
        next(error);
    }
};

exports.getUserProfile = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const sql = `SELECT * FROM User WHERE id = ?`;
        const user = await executeQuery(sql, [user_id]);
        return res.status(200).json({ success: true, user: user[0] });
    } catch (error) {
        next(error);
    }
};

exports.getFullUserProfile = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;

        const sql = `SELECT * FROM User WHERE id = ?`;
        const user = await executeQuery(sql, [user_id]);

        const postsSql = 'SELECT post_id, img_link FROM Post WHERE user_id = ?';
        const posts = await executeQuery(postsSql, [user_id]);

        const fullProfile = {
            user: user[0],
            posts: posts
        };

        return res.status(200).json({ success: true, profile: fullProfile });
    } catch (error) {
        next(error);
    }
};

exports.addUserBio = async (req, res, next) => {
    try {
        const user_id = req.params.user_id; 
        const bio = req.body.bio; 
        const sql = `UPDATE User SET bio = ? WHERE id = ?`;
        await executeQuery(sql, [bio, user_id]);
        return res.status(200).json({ success: true, message:"Bio added successfully" });
    } catch (error) {
        next(error);
    }
};

exports.updateUserBio = async (req, res, next) => {
    try {
        const user_id = req.params.user_id; 
        const bio = req.body.bio; 
        const sql = `UPDATE User SET bio = ? WHERE id = ?`;
        await executeQuery(sql, [bio, user_id]);
        return res.status(200).json({ success: true, message:"Bio updated successfully" });
    } catch (error) {
        next(error);
    }
};
