const { Server } = require("socket.io");

let io;

const onlineUsers = {};

function initSocket(server) {

    io = new Server(server, {

        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }

    });


    io.on("connection", (socket) => {

        console.log("socket connected");


        socket.on(
            "join",
            (userId) => {

                onlineUsers[userId] =
                    socket.id;

                console.log(
                    "joined:",
                    userId
                );

            }
        );


        socket.on(
            "disconnect",
            () => {

                for(
                    let userId
                    in
                    onlineUsers
                ){

                    if(
                        onlineUsers[userId]
                        ===
                        socket.id
                    ){

                        delete onlineUsers[userId];

                    }

                }

            }
        );

    });

}



function getReceiverSocketId(
    userId
){

    return onlineUsers[userId];

}


module.exports={

    initSocket,

    getReceiverSocketId,

    io:()=>io

};