const executeQuery = require("../utils/executeQuery");

exports.createPost = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const { img_link } = req.body;
        const query = 'INSERT INTO Post (img_link,user_id) VALUES (?,?)';
        const values = [img_link,user_id];
        await executeQuery(query, values);

        const updateUserQuery = 'UPDATE User SET no_of_posts = no_of_posts + 1 WHERE user_id = ?';
        const updateUserValues = [user_id];
        await executeQuery(updateUserQuery, updateUserValues);

        return res.status(201).json({ success: true, message: 'Post created successfully' });
    } catch (error) {
        next(error);
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const post_id = req.params.post_id;
        const user_id = req.params.user_id;

        
        const verifyPostQuery = 'SELECT user_id FROM Post WHERE post_id = ?';
        const [post] = await executeQuery(verifyPostQuery, [post_id]);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.user_id !== parseInt(user_id)) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        const deletePostQuery = 'DELETE FROM Post WHERE post_id = ?';
        const deleteCommentsQuery = 'DELETE FROM Comment WHERE post_id = ?';
        const deleteLikesQuery = 'DELETE FROM Likes WHERE post_id = ?';
        const updateUserQuery = 'UPDATE User SET no_of_posts = no_of_posts - 1 WHERE user_id = ?';

        await executeQuery('START TRANSACTION');

        await executeQuery(deletePostQuery, [post_id]);

        await executeQuery(deleteCommentsQuery, [post_id]);

        await executeQuery(deleteLikesQuery, [post_id]);

        await executeQuery(updateUserQuery, [user_id]);

        await executeQuery('COMMIT');

        return res.status(200).json({ success: true, message: 'Post, associated comments, and likes deleted successfully' });
    } catch (error) {
        await executeQuery('ROLLBACK');
        next(error);
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const post_id = req.params.post_id;
        const user_id = req.params.user_id;
        const { img_link} = req.body;
        const query = 'UPDATE Post SET img_link = ? WHERE post_id = ? AND user_id = ?';
        const values = [img_link, no_of_likes, JSON.stringify(multiple_comment_ids), post_id, user_id];
        await executeQuery(query, values);
        return res.status(200).json({ success: true, message: 'Post updated successfully' });
    } catch (error) {
        next(error);
    }
}

exports.getOnePost = async (req, res, next) => {
    try {
        const post_id = req.params.post_id;
        const query = 'SELECT * FROM Post WHERE post_id = ?';
        const values = [post_id];
        const post = await executeQuery(query, values);
        return res.status(200).json({success: true, post});
    } catch (error) {
        next(error);
    }
}

exports.getAllPostsOfOneUser = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const query = 'SELECT * FROM Post WHERE user_id = ?';
        const values = [user_id];
        const posts = await executeQuery(query, values);
        return res.status(200).json({success: true, posts});
    } catch (error) {
        next(error);
    }
}

exports.likePost = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const user_id = req.params.user_id;

        const checkLikeQuery = 'SELECT COUNT(*) AS count FROM Likes WHERE user_id = ? AND post_id = ?';
        const checkLikeValues = [user_id, post_id];
        const likeRow = await executeQuery(checkLikeQuery, checkLikeValues);
        const alreadyLiked = likeRow[0].count > 0;


        let message;

        if (alreadyLiked) {

            const unlikeQuery = 'DELETE FROM Likes WHERE user_id = ? AND post_id = ?';
            await executeQuery(unlikeQuery, checkLikeValues);
            message = 'Post unliked successfully';

       
            const updateLikesQuery = 'UPDATE Post SET no_of_likes = no_of_likes - 1 WHERE post_id = ?';
            await executeQuery(updateLikesQuery, [post_id]);
        } else {
           
            const likeQuery = 'INSERT INTO Likes (user_id, post_id) VALUES (?, ?)';
            await executeQuery(likeQuery, checkLikeValues);
            message = 'Post liked successfully';

          
            const updateLikesQuery = 'UPDATE Post SET no_of_likes = no_of_likes + 1 WHERE post_id = ?';
            await executeQuery(updateLikesQuery, [post_id]);
        }

        return res.status(200).json({ success: true, message});
    } catch (error) {
        next(error);
    }
}

exports.commentOnPost = async (req, res, next) => {
    try {
        const { post_id,user_id } = req.params;
        const { comment } = req.body;
        
        const query = 'INSERT INTO Comment (user_id, post_id, comment) VALUES (?, ?, ?)';
        const values = [user_id, post_id, comment];
        await executeQuery(query, values);

        const updateCommentsQuery = 'UPDATE Post SET no_of_comments = no_of_comments + 1 WHERE post_id = ?';
        const updateCommentsValues = [post_id];
        await executeQuery(updateCommentsQuery, updateCommentsValues);

        return res.status(201).json({ success: true, message: 'Comment added successfully' });
    } catch (error) {
        next(error);
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const comment_id = req.params.comment_id;
        const user_id = req.params.user_id;

        const verifyUserQuery = 'SELECT user_id, post_id FROM Comment WHERE comment_id = ?';
        const [comment] = await executeQuery(verifyUserQuery, [comment_id]);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user_id !== parseInt(user_id)) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }

        const deleteQuery = 'DELETE FROM Comment WHERE comment_id = ?';
        await executeQuery(deleteQuery, [comment_id]);

        const updatePostQuery = 'UPDATE Post SET no_of_comments = no_of_comments - 1 WHERE post_id = ?';
        await executeQuery(updatePostQuery, [comment.post_id]);

        return res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
        next(error);
    }
}

exports.getAllCommentsOnAPost = async (req, res, next) => {
    try {
        const post_id = req.params.post_id;
        const query = 'SELECT * FROM Comment WHERE post_id = ?';
        const values = [post_id];
        const comments = await executeQuery(query, values);
        return res.status(200).json({success: true, comments});
    } catch (error) {
        next(error);
    }
}

