require('dotenv').config();
const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/db/db")
const startCleanupTasks = require("./src/tasks/startCleanupTasks");

const { initSocket } = require("./src/socket/socket");

connectDB();

startCleanupTasks();

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// })

const server = http.createServer( app );


initSocket( server );


server.listen( 3000, () => { 
    console.log(
        "Server running"
    );
    }
);