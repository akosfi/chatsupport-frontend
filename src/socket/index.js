import io from 'socket.io-client';
import { CONNECT, DISCONNECT, CONNECT_ERR, RECONNECT_ERR, IDENT, IM } from './constants';


class ChatSocket {

    constructor() {
        this.socket = null;
        this.port = 3000;
        this.onChange = null;
        this.onSocketError = null;
        this.onMessage = null;
    }

    connect() {
        const host = `http://localhost:${this.port}`;
        
        this.socket = io.connect(host);

        this.socket.on(CONNECT, this.onConnected);
        this.socket.on(DISCONNECT, this.onDisconnected);
        this.socket.on(CONNECT_ERR, this.onError);
        this.socket.on(RECONNECT_ERR, this.onError);

    }

    onConnected() {
        this.sendIdent();
        this.socket.on(IM, this.onMessage);
        this.onChange(true);
    }

    sendIdent() {
        this.socket.emit(IDENT, "COOKIEHERE");
    }

    onDisconnected(){
        this.onChange(false);
    }

    sendIm(message) {
        this.socket.emit(IM, message);
    } 

    disconnect() {
        this.onDisconnected();
        this.socket.close();
    }

    onError(message) {
        //this.onSocketError(message);
        this.disconnect();
    };
}

export default ChatSocket;