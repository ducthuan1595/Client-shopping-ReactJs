import { io } from "socket.io-client";
import Ably from 'ably/promises';

export const socket = io(process.env.REACT_APP_API_URL);
