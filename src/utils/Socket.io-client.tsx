import { Socket, io } from "socket.io-client";
import { HOST } from "../constant/Host";

export const socket = io(HOST.SOCKET, {
    autoConnect: false,
});