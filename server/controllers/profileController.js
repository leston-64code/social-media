const executeQuery = require("../utils/executeQuery");
const sharp = require('sharp');
const { uploadToS3 } = require("../utils/aws/uploadToS3");
const { getSignedUrl } = require("../utils/aws/getSignedUrl");


exports.uploadProfilePicture = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Profile picture file not found" });
        }


        const originalImage = req.file.buffer;
        const webpImageBuffer = await sharp(originalImage).toFormat('webp').toBuffer();

        const sizes = [50, 100];

        const originalKey = `user_${user_id}_original.webp`;
        await uploadToS3(webpImageBuffer, originalKey);

        const compressedUrls = await Promise.all(sizes.map(async size => {
            const resizedImageBuffer = await sharp(originalImage).resize(size).toBuffer();
            const key = `user_${user_id}_compressed_${size}.webp`;
            await uploadToS3(resizedImageBuffer, key);
            return getSignedUrl(key);
        }));

        const profilePicLink = getSignedUrl(originalKey);
        const compressed_half_pic=compressedUrls[1]
        const compressed_full_pic=compressedUrls[2]
        const sql = `UPDATE User SET org_profile_pic = ?, compressed_half_pic = ?, compressed_full_pic = ? WHERE user_id = ?`;
        await executeQuery(sql, [profilePicLink,compressed_half_pic,compressed_full_pic, user_id]);

        return res.status(200).json({ success: true, message: "Profile picture uploaded" });
    } catch (error) {
        next(error);
    }
};

exports.removeProfilePicture = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const sql = `UPDATE User SET profile_pic_link = NULL WHERE id = ?`;
        await executeQuery(sql, [user_id]);
        return res.status(200).json({ success: true, message: "Profile picture removed" });
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
        return res.status(200).json({ success: true, message: "Bio added successfully" });
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
        return res.status(200).json({ success: true, message: "Bio updated successfully" });
    } catch (error) {
        next(error);
    }
};
