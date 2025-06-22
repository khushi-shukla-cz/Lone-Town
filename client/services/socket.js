import { io } from 'socket.io-client';

// IMPORTANT: Replace with your server's actual IP address or URL
// For local development with an emulator, use 10.0.2.2 for Android.
// For a physical device, use your computer's local network IP.
const SERVER_URL = 'http://10.0.2.2:5000';

const socket = io(SERVER_URL, {
  transports: ['websocket'], // Ensures we use WebSockets
});

export default socket;
