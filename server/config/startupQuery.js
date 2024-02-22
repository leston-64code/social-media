function createTables(connection) {
    const createDatabaseQuery = `
    CREATE DATABASE IF NOT EXISTS social_media
  `;

    const useDatabaseQuery = `
    USE social_media
  `;

    const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS User (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255),
      user_name VARCHAR(255),
      no_of_followers INT,
      no_of_following INT,
      no_of_posts INT,
      profile_pic_link VARCHAR(255),
      bio TEXT,
      multiple_post_ids JSON
    )
  `;

    const createPostTableQuery = `
    CREATE TABLE IF NOT EXISTS Post (
      post_id INT AUTO_INCREMENT PRIMARY KEY,
      time_of_post DATETIME,
      img_link VARCHAR(255),
      no_of_likes INT,
      multiple_comment_ids JSON
    )
  `;

    const createCommentTableQuery = `
    CREATE TABLE IF NOT EXISTS Comment (
      comment_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      comment TEXT,
      FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
    )
  `;

    const createLikeTableQuery = `
    CREATE TABLE IF NOT EXISTS Likes (
      like_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      post_id INT,
      FOREIGN KEY (user_id) REFERENCES User(id),
      FOREIGN KEY (post_id) REFERENCES Post(post_id) ON DELETE CASCADE
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
