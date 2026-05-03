use my_application;

INSERT INTO users (username, email) VALUES 
('rachel', 'rachel@gmail.com'),
('david', 'david@gmail.com');

INSERT INTO passwords (user_id, password) VALUES 
(1, '1234'),
(2, 'abcd');

INSERT INTO todos (user_id, title, completed) VALUES
(1, 'Buy milk', true),
(1, 'Study React', false),
(2, 'Go gym', true);

INSERT INTO posts (user_id, title, body) VALUES
(1, 'My first post', 'Hello world'),
(2, 'Another post', 'Content here');

INSERT INTO comments (post_id, user_id, body) VALUES
(1, 1, 'Nice post!'),
(1, 2, 'Great!');