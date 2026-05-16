import { createContext, useEffect } from "react";

import socket from "../socket/socket";


export const SocketContext = createContext();


const SocketProvider =
    ({ children }) => {

        const user =JSON.parse( localStorage.getItem("user"));


        useEffect(() => {

            if (user) {

                socket.emit(
                    "join",
                    user.id
                );

            }

        }, []);


        return (

            <SocketContext.Provider
                value={socket}
            >

                {children}

            </SocketContext.Provider>

        );

    };

export default SocketProvider;