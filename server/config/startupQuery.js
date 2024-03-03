function createTables(connection) {
    const createDatabaseQuery = `
    CREATE DATABASE IF NOT EXISTS social_media
  `;

    const useDatabaseQuery = `
    USE social_media
  `;

    const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS User (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255),
      user_name VARCHAR(255),
      no_of_followers INT DEFAULT 0,
      no_of_following INT DEFAULT 0,
      no_of_posts INT DEFAULT 0,
      accepted_followers TEXT,
      following TEXT,
      pending_follow_requests TEXT,
      org_profile_pic VARCHAR(255),
      compressed_half_pic VARCHAR(255),
      compressed_full_pic VARCHAR(255),
      bio TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

    const createFollowRequestTableQuery=`
    CREATE TABLE IF NOT EXISTS FollowRequest (
      request_id INT AUTO_INCREMENT PRIMARY KEY,
      requester_id INT,
      receiver_id INT,
      status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (requester_id) REFERENCES User(user_id) ON DELETE CASCADE,
      FOREIGN KEY (receiver_id) REFERENCES User(user_id) ON DELETE CASCADE
    );
    `

    const createPostTableQuery = `
    CREATE TABLE IF NOT EXISTS Post (
      post_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      time_of_post DATETIME DEFAULT CURRENT_TIMESTAMP,
      img_link VARCHAR(255),
      com_img_link VARCHAR(255),
      no_of_likes INT DEFAULT 0,
      no_of_comments INT DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
      INDEX idx_user_id (user_id)
    )
  `;

    const createCommentTableQuery = `
    CREATE TABLE IF NOT EXISTS Comment (
      comment_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      post_id INT,
      comment TEXT,
      FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
      FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE,
      INDEX idx_post_id (post_id)
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    )
  `;

    const createLikeTableQuery = `
    CREATE TABLE IF NOT EXISTS Likes (
      like_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      post_id INT,
      FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
      FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE,
      INDEX idx_post_id (post_id)
    )
  `;


    connection.query(createDatabaseQuery, (err, results, fields) => {
        if (err) throw err;
        console.log('Database created or already exists.');
    });

    connection.query(useDatabaseQuery, (err, results, fields) => {
        if (err) throw err;
        console.log('Using database: social_media');
    });

    connection.query(createUserTableQuery, (err, results, fields) => {
        if (err) throw err;
        console.log('User table created or already exists.');
    });

    connection.query(createFollowRequestTableQuery, (err, results, fields) => {
        if (err) throw err;
        console.log('Follow Request table created or already exists.');
    });

    connection.query(createPostTableQuery, (err, results, fields) => {
        if (err) throw err;
        console.log('Post table created or already exists.');
    });

    connection.query(createCommentTableQuery, (err, results, fields) => {
        if (err) throw err;
        console.log('Comment table created or already exists.');
    });

    connection.query(createLikeTableQuery, (err, results, fields) => {
        if (err) throw err;
        console.log('Likes table created or already exists.');
    });
}

module.exports=createTables
