
exports.uploadProfilePicture = catchAsyncError(async (req, res, next) => {
    const userId = req.userId; // Assuming userId is extracted from the request
    const profilePicLink = req.body.profilePicLink; // Assuming profilePicLink is sent in the request body
    const sql = `UPDATE User SET profile_pic_link = ? WHERE id = ?`;
    await query(sql, [profilePicLink, userId]);
    res.status(200).json({ success: true });
})

exports.removeProfilePicture = catchAsyncError(async (req, res, next) => {
    const userId = req.userId; // Assuming userId is extracted from the request
    const sql = `UPDATE User SET profile_pic_link = NULL WHERE id = ?`;
    await query(sql, [userId]);
    res.status(200).json({ success: true });
})

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const userId = req.userId; // Assuming userId is extracted from the request
    const sql = `SELECT * FROM User WHERE id = ?`;
    const user = await query(sql, [userId]);
    res.status(200).json({ success: true, user: user[0] });
})

exports.getUserStats = catchAsyncError(async (req, res, next) => {

})

exports.addUserBio = catchAsyncError(async (req, res, next) => {
    const userId = req.userId; // Assuming userId is extracted from the request
    const bio = req.body.bio; // Assuming bio is sent in the request body
    const sql = `UPDATE User SET bio = ? WHERE id = ?`;
    await query(sql, [bio, userId]);
    res.status(200).json({ success: true });
})
exports.updateUserBio = catchAsyncError(async (req, res, next) => {
    const userId = req.userId; // Assuming userId is extracted from the request
    const bio = req.body.bio; // Assuming bio is sent in the request body
    const sql = `UPDATE User SET bio = ? WHERE id = ?`;
    await query(sql, [bio, userId]);
    res.status(200).json({ success: true });
})