
exports.createPost = async (req, res, next) => {
    try {
        const { time_of_post, img_link, no_of_likes, multiple_comment_ids } = req.body;
        const query = 'INSERT INTO Post (time_of_post, img_link, no_of_likes, multiple_comment_ids) VALUES (?, ?, ?, ?)';
        const values = [time_of_post, img_link, no_of_likes, JSON.stringify(multiple_comment_ids)];
        await executeQuery(query, values);
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        next(error);
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id; // Assuming you have middleware to authenticate users and store user information in req.user
        const deletePostQuery = 'DELETE FROM Post WHERE post_id = ? AND user_id = ?';
        const deleteCommentsQuery = 'DELETE FROM Comment WHERE post_id = ?';
        const deleteLikesQuery = 'DELETE FROM Likes WHERE post_id = ?';

        await executeQuery('START TRANSACTION');

        await executeQuery(deletePostQuery, [postId, userId]);

        await executeQuery(deleteCommentsQuery, [postId]);

        await executeQuery(deleteLikesQuery, [postId]);

        await executeQuery('COMMIT');

        res.status(200).json({ message: 'Post, associated comments, and likes deleted successfully' });
    } catch (error) {
        // Rollback the transaction if an error occurs
        await executeQuery('ROLLBACK');
        next(error);
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id;
        const { img_link, no_of_likes, multiple_comment_ids } = req.body;
        const query = 'UPDATE Post SET img_link = ?, no_of_likes = ?, multiple_comment_ids = ? WHERE post_id = ? AND user_id = ?';
        const values = [img_link, no_of_likes, JSON.stringify(multiple_comment_ids), postId, userId];
        await executeQuery(query, values);
        res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        next(error);
    }
}

exports.getOnePost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const query = 'SELECT * FROM Post WHERE post_id = ?';
        const values = [postId];
        const post = await executeQuery(query, values);
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

exports.getAllPostsOfOneUser = async (req, res, next) => {
    try {
        const userId = req.params.userId; // Assuming you have a route parameter for userId
        const query = 'SELECT * FROM Post WHERE user_id = ?';
        const values = [userId];
        const posts = await executeQuery(query, values);
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

exports.likePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        const query = 'INSERT INTO Likes (user_id, post_id) VALUES (?, ?)';
        const values = [userId, postId];
        await executeQuery(query, values);
        res.status(200).json({ message: 'Post liked successfully' });
    } catch (error) {
        next(error);
    }
}

exports.commentOnPost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { user_id, comment } = req.body;
        const query = 'INSERT INTO Comment (user_id, comment) VALUES (?, ?)';
        const values = [user_id, comment];
        await executeQuery(query, values);
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        next(error);
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user.id;
        const query = 'DELETE FROM Comment WHERE comment_id = ? AND user_id = ?';
        const values = [commentId, userId];
        await executeQuery(query, values);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        next(error);
    }
}

exports.getAllCommentsOnAPost = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const query = 'SELECT * FROM Comment WHERE post_id = ?';
        const values = [postId];
        const comments = await executeQuery(query, values);
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}

