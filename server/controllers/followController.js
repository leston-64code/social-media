const executeQuery = require("../utils/executeQuery");


exports.sendFollowRequest = async (req, res, next) => {
    try {
        const requester_id = req.params.requester_id;
        const receiver_id = req.params.receiver_id;


        const sendFollowRequestQuery = 'INSERT INTO FollowRequest (requester_id, receiver_id) VALUES (?, ?)';
        await executeQuery(sendFollowRequestQuery, [requester_id, receiver_id]);

        const getExistingPendingFollowRequestsQuery = 'SELECT pending_follow_requests FROM User WHERE user_id = ?'
        let results = await executeQuery(getExistingPendingFollowRequestsQuery, [receiver_id])

        let existingPendingRequests = results[0].pending_follow_requests
        let pendingRequests

        if (existingPendingRequests == null) {
            pendingRequests = `${requester_id}`
        } else {
            pendingRequests = existingPendingRequests + `,${requester_id}`
        }

        const updatePendingFollowRequestsQuery = 'UPDATE User SET pending_follow_requests = ? WHERE user_id = ?';
        await executeQuery(updatePendingFollowRequestsQuery, [pendingRequests, receiver_id]);

        return res.status(200).json({ success: true, message: 'Follow request sent successfully' });
    } catch (error) {
        next(error);
    }
}

exports.acceptFollowRequest = async (req, res, next) => {
    try {
        const requester_id = req.params.requester_id;
        const receiver_id = req.params.receiver_id;

        const checkIfAcceptedQuery = 'SELECT f.status FROM FollowRequest f WHERE f.requester_id = ? AND f.receiver_id = ?';
        const result = await executeQuery(checkIfAcceptedQuery, [requester_id, receiver_id]);

        if (result && result.length > 0 && result[0].status === 'accepted') {
            return res.status(400).json({ message: 'Follow request already accepted' });
        }

        const acceptFollowRequestQuery = 'UPDATE FollowRequest  SET status = "accepted" WHERE requester_id = ? AND receiver_id = ?';
        await executeQuery(acceptFollowRequestQuery, [requester_id, receiver_id]);

        const getExistingPendingFollowRequestsQuery = 'SELECT pending_follow_requests,following,accepted_followers FROM User WHERE user_id = ?'
        let results = await executeQuery(getExistingPendingFollowRequestsQuery, [receiver_id])

        let existingPendingRequests = results[0].pending_follow_requests

        let valueToRemove = `${requester_id}`;

        let array = existingPendingRequests.split(",");

        let filteredArray = array.filter(item => item !== valueToRemove);

        let resultString = filteredArray.join(",");

        const removePendingFollowRequestQuery = 'UPDATE User SET pending_follow_requests = ?  WHERE user_id = ?';
        await executeQuery(removePendingFollowRequestQuery, [resultString, receiver_id]);

        let acceptedFollowers
        if (results[0].accepted_followers == null) {
            acceptedFollowers = `${requester_id}`
        } else {
            acceptedFollowers = results[0].accepted_followers + `,${requester_id}`
        }
        const addFollowerQuery = 'UPDATE User SET accepted_followers = ? WHERE user_id = ?';
        await executeQuery(addFollowerQuery, [acceptedFollowers, receiver_id]);

        let getFollowingQuery = 'SELECT following FROM User WHERE user_id= ?'
        let ans = await executeQuery(getFollowingQuery, [requester_id])
        if (ans[0].following == null) {
            ans = `${receiver_id}`
        } else {
            ans = ans[0].following + `,${receiver_id}`
        }
        let updateFollowingQuery = 'UPDATE User SET following= ? WHERE user_id= ?'
        await executeQuery(updateFollowingQuery, [ans, requester_id])


        const incrementFollowingQuery = 'UPDATE User SET no_of_following = no_of_following + 1 WHERE user_id = ?';
        await executeQuery(incrementFollowingQuery, [requester_id]);

        const incrementFollowersQuery = 'UPDATE User SET no_of_followers = no_of_followers + 1 WHERE user_id = ?';
        await executeQuery(incrementFollowersQuery, [receiver_id]);

        return res.status(200).json({ success: true, message: 'Follow request accepted successfully' });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

exports.rejectFollowRequest = async (req, res, next) => {
    try {
        const requester_id = req.params.requester_id;
        const receiver_id = req.params.receiver_id;


        const rejectFollowRequestQuery = 'UPDATE FollowRequest  SET status = "rejected" WHERE requester_id = ? AND receiver_id = ?';
        await executeQuery(rejectFollowRequestQuery, [requester_id, receiver_id]);

        const getExistingPendingFollowRequestsQuery = 'SELECT pending_follow_requests FROM User WHERE user_id = ?'
        let results = await executeQuery(getExistingPendingFollowRequestsQuery, [receiver_id])

        let existingPendingRequests = results[0].pending_follow_requests

        let valueToRemove = `${requester_id}`;

        let array = existingPendingRequests.split(",");

        let filteredArray = array.filter(item => item !== valueToRemove);

        let resultString = filteredArray.join(",");

        const removePendingFollowRequestQuery = 'UPDATE User SET pending_follow_requests = ? WHERE user_id = ?';
        await executeQuery(removePendingFollowRequestQuery, [resultString, receiver_id]);

        return res.status(200).json({ success: true, message: 'Follow request rejected successfully' });
    } catch (error) {
        next(error);
    }
}

exports.unFollow = async (req, res, next) => {
    try {
        const { initiator_id, respondent_id } = req.params;

    
        const getFollowingQuery = 'SELECT following FROM User WHERE user_id = ?';
        let result = await executeQuery(getFollowingQuery, [initiator_id]);
        let followingList = result[0].following;

        if (followingList) {
            const followingArray = followingList.split(",");
            const filteredFollowing = followingArray.filter(item => item !== respondent_id);
            const updatedFollowing = filteredFollowing.join(",");
            const updateFollowingQuery = 'UPDATE User SET following = ? WHERE user_id = ?';
            await executeQuery(updateFollowingQuery, [updatedFollowing, initiator_id]);
        }

       
        const getAcceptedFollowersQuery = 'SELECT accepted_followers FROM User WHERE user_id = ?';
        result = await executeQuery(getAcceptedFollowersQuery, [respondent_id]);
        let acceptedFollowersList = result[0].accepted_followers;

        if (acceptedFollowersList) {
            const acceptedFollowersArray = acceptedFollowersList.split(",");
            const filteredAcceptedFollowers = acceptedFollowersArray.filter(item => item !== initiator_id);
            const updatedAcceptedFollowers = filteredAcceptedFollowers.join(",");
            const updateAcceptedFollowersQuery = 'UPDATE User SET accepted_followers = ? WHERE user_id = ?';
            await executeQuery(updateAcceptedFollowersQuery, [updatedAcceptedFollowers, respondent_id]);
        }

     
        const decrementFollowingQuery = 'UPDATE User SET no_of_following = no_of_following - 1 WHERE user_id = ?';
        await executeQuery(decrementFollowingQuery, [initiator_id]);

        const decrementFollowersQuery = 'UPDATE User SET no_of_followers = no_of_followers - 1 WHERE user_id = ?';
        await executeQuery(decrementFollowersQuery, [respondent_id]);

        return res.status(200).json({ success: true, message: 'Unfollowed successfully' });
    } catch (error) {
        next(error);
    }
}

exports.getFollowers = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;

        // const query='SELECT accepted_followers from User where user_id = ?'
        // let result=await executeQuery(query,[user_id])
        // console.log(result[0].accepted_followers)
        // const getFollowersQuery='SELECT user_id, name, user_name FROM User WHERE FIND_IN_SET(?,?);'
        // let followers=await executeQuery(getFollowersQuery,[user_id,result[0].accepted_followers])

        const getFollowersQuery='SELECT u.user_id, u.name, u.user_name, u.email, u.compressed_full_pic FROM User u WHERE FIND_IN_SET(u.user_id, (SELECT accepted_followers FROM User WHERE user_id = ?));'
        let followers=await executeQuery(getFollowersQuery,[user_id])

        return res.status(200).json({success: true, message:"Followers fetched",followers});
    } catch (error) {
        next(error);
    }
}

exports.getFollowing = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        
        const getFollowingQuery='SELECT u.user_id, u.name, u.user_name, u.email, u.compressed_full_pic FROM User u WHERE FIND_IN_SET(u.user_id, (SELECT following FROM User WHERE user_id = ?));'
        let following=await executeQuery(getFollowingQuery,[user_id])

        return res.status(200).json({success: true, message:"Following fetched",following});
    } catch (error) {
        next(error);
    }
}

exports.getPendingRequests=async(req,res,next)=>{
    try {
        const {receiver_id}=req.params
        const query = `
            SELECT 
                FollowRequest.*, 
                User.user_id, 
                User.name, 
                User.email, 
                User.compressed_full_pic 
            FROM 
                FollowRequest 
            INNER JOIN 
                User 
            ON 
                FollowRequest.requester_id = User.user_id 
            WHERE 
                FollowRequest.receiver_id = ? 
            AND 
                FollowRequest.status = 'pending';`;
        let pending=await executeQuery(query,[receiver_id])
        return res.status(200).json({success:true,message:"Pending requests fetched",pending})
    } catch (error) {
        next(error);
    }
}