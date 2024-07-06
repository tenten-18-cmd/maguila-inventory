import { createConnection } from 'mysql';

//Create connection to MySQL
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory_system'
});

export const checkConnection = () => {
    connection.connect((err) => {
        if (err){
            console.error('Error Connecting to MySQL database: ' + err.stack);
            return;
        }
        console.log('Connect to MySQL database as id' + connection.threadId);
    });

    return connection;
}

//Close MySQL connection when Node.js app exits
process.on('exit', () => {
    connection.end();
});