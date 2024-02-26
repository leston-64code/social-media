const executeTransactionQuery = (connection,query, values) => {
    return new Promise((resolve, reject) => {
        console.log("superman")
        connection.query(query, values, (error, results) => {
            console.log("from inside")
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports=executeTransactionQuery