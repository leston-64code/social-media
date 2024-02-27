const executeQuery = require("../utils/executeQuery");


exports.sendFollowRequest = async (req, res, next) => {
    try {
        const requester_id = req.params.requester_id;
        const receiver_id = req.params.receiver_id;
        
       
        const sendFollowRequestQuery = 'INSERT INTO FollowRequest (requester_id, receiver_id) VALUES (?, ?)';
        await executeQuery(sendFollowRequestQuery, [requester_id, receiver_id]);

        const getExistingPendingFollowRequestsQuery='SELECT pending_follow_requests FROM User WHERE user_id = ?'
        let results=await executeQuery(getExistingPendingFollowRequestsQuery,[receiver_id])

        let existingPendingRequests=results[0].pending_follow_requests
        let pendingRequests

        if(existingPendingRequests==null){
            pendingRequests=`${requester_id}`
        }else{
            pendingRequests=existingPendingRequests+`,${requester_id}`
        }

        const updatePendingFollowRequestsQuery = 'UPDATE User SET pending_follow_requests = ? WHERE user_id = ?';
        await executeQuery(updatePendingFollowRequestsQuery, [pendingRequests, receiver_id]);

        res.status(200).json({ message: 'Follow request sent successfully' });
    } catch (error) {
        next(error);
    }
}

exports.acceptFollowRequest = async (req, res, next) => {
    try {
        const requester_id = req.params.requester_id;
        const receiver_id = req.params.receiver_id;

        const checkIfAcceptedQuery = 'SELECT status FROM FollowRequest WHERE requester_id = ? AND receiver_id = ?';
        const result = await executeQuery(checkIfAcceptedQuery, [requester_id, receiver_id]);

        if (result && result.length > 0 && result[0].status === 'accepted') {
            return res.status(400).json({ message: 'Follow request already accepted' });
        }
    
        const acceptFollowRequestQuery = 'UPDATE FollowRequest SET status = "accepted" WHERE requester_id = ? AND receiver_id = ?';
        await executeQuery(acceptFollowRequestQuery, [requester_id, receiver_id]);

        const getExistingPendingFollowRequestsQuery='SELECT pending_follow_requests,following,accepted_followers FROM User WHERE user_id = ?'
        let results=await executeQuery(getExistingPendingFollowRequestsQuery,[receiver_id])

        let existingPendingRequests=results[0].pending_follow_requests

        let valueToRemove = `${requester_id}`;

        let array = existingPendingRequests.split(",");
      
        let filteredArray = array.filter(item => item !== valueToRemove);

        let resultString = filteredArray.join(",");
      
        const removePendingFollowRequestQuery = 'UPDATE User SET pending_follow_requests = ?  WHERE user_id = ?';
        await executeQuery(removePendingFollowRequestQuery, [resultString, receiver_id]);

        let acceptedFollowers
        if(results[0].accepted_followers==null){
            acceptedFollowers=`${requester_id}`
        }else{
            acceptedFollowers=results[0].accepted_followers+`,${requester_id}`
        }
        const addFollowerQuery = 'UPDATE User SET accepted_followers = ? WHERE user_id = ?';
        await executeQuery(addFollowerQuery, [acceptedFollowers, receiver_id]);

        let getFollowingQuery='SELECT following FROM User WHERE user_id= ?'
        let ans=await executeQuery(getFollowingQuery,[requester_id])
        if(ans[0].following==null){
            ans=`${receiver_id}`
        }else{
            ans=ans[0].following+`,${receiver_id}`
        }
        let updateFollowingQuery='UPDATE User SET following= ? WHERE user_id= ?'
        await executeQuery(updateFollowingQuery,[ans,requester_id])


        const incrementFollowingQuery = 'UPDATE User SET no_of_following = no_of_following + 1 WHERE user_id = ?';
        await executeQuery(incrementFollowingQuery, [requester_id]);

        const incrementFollowersQuery = 'UPDATE User SET no_of_followers = no_of_followers + 1 WHERE user_id = ?';
        await executeQuery(incrementFollowersQuery, [receiver_id]);

        res.status(200).json({ message: 'Follow request accepted successfully' });
    } catch (error) {
        next(error);
    }
}

exports.rejectFollowRequest = async (req, res, next) => {
    try {
        const requester_id = req.params.requester_id;
        const receiver_id = req.params.receiver_id;

    
        const rejectFollowRequestQuery = 'UPDATE FollowRequest SET status = "rejected" WHERE requester_id = ? AND receiver_id = ?';
        await executeQuery(rejectFollowRequestQuery, [requester_id, receiver_id]);

        const getExistingPendingFollowRequestsQuery='SELECT pending_follow_requests FROM User WHERE user_id = ?'
        let results=await executeQuery(getExistingPendingFollowRequestsQuery,[receiver_id])

        let existingPendingRequests=results[0].pending_follow_requests

        let valueToRemove = `${requester_id}`;

        let array = existingPendingRequests.split(",");
      
        let filteredArray = array.filter(item => item !== valueToRemove);

        let resultString = filteredArray.join(",");
       
        const removePendingFollowRequestQuery = 'UPDATE User SET pending_follow_requests = ? WHERE user_id = ?';
        await executeQuery(removePendingFollowRequestQuery, [resultString, receiver_id]);

        res.status(200).json({ message: 'Follow request rejected successfully' });
    } catch (error) {
        next(error);
    }
}

exports.getFollowers = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const getFollowersQuery = 'SELECT accepted_followers FROM User WHERE user_id = ?';
        const followers = await executeQuery(getFollowersQuery, [user_id]);
        res.status(200).json(followers);
    } catch (error) {
        next(error);
    }
}

exports.getFollowing = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const getFollowingQuery = 'SELECT pending_follow_requests FROM User WHERE user_id = ?';
        const following = await executeQuery(getFollowingQuery, [user_id]);
        res.status(200).json(following);
    } catch (error) {
        next(error);
    }
}

