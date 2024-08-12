import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  // sua senha
    database: 'task_management'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL!');
});

export default connection;
