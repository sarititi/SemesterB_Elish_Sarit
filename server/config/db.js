import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql24',
    database: 'my_application'
});

db.connect(err => {
    if (err) {
        console.error('DB connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

console.log('Using DB: my_application');

export default db.promise();