import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { CONNECT, DISCONNECT, CONNECT_ERR, RECONNECT_ERR, IDENT, IM } from './constants';


class ChatSocket {

    constructor() {
        this.socket = null;
        this.port = 3000;
        this.onChange = null;
        this.onConnectError = null;
        this.onMessage = null;

        this._identifyClient = this._identifyClient.bind(this);
        this._connect = this._connect.bind(this);
        this._onConnected = this._onConnected.bind(this);
        this._onError = this._onError.bind(this);
    }

    _connect() {
        const host = `http://localhost:${this.port}`;
        
        this.socket = io(host);

        this.socket.on(CONNECT, this._onConnected);
        this.socket.on(DISCONNECT, this._onDisconnected);
        this.socket.on(CONNECT_ERR, this._onError);
    }

    _onConnected() {
        this._identifyClient();
        this.socket.on(IM, this.onMessage);
        this.onChange(true);
    }

    _identifyClient() {
        const identMessage = {
            guest_cookie: Cookies.get('guest_cookie'),
            lc_license: (window.__lc ? window.__lc.license : 0)
        }
        this.socket.emit(IDENT, identMessage);
    }

    _onDisconnected(){
        this.onChange(false);
    }

    _sendIm(message) {
        this.socket.emit(IM, message);
    } 

    _disconnect() {
        this._onDisconnected();
        this.socket.close();
    }

    _onError(message) {
        this.onConnectError();
        this._disconnect();
    };
}

export default ChatSocket;