import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { CONNECTED, DISCONNECTED, INCOMING_MESSAGE, IDENTIFY_GUEST } from './constants';


class ChatSocket {

    constructor() {
        this.socket = null;
        this.port = 3000;
        this.onChange = null;
        this.onConnectError = null;
        this.onMessage = null;

        this._identifyGuest = this._identifyGuest.bind(this);
        this._connect = this._connect.bind(this);
        this._onConnected = this._onConnected.bind(this);
        this._onError = this._onError.bind(this);
        this._setGuest = this._setGuest.bind(this);
    }

    _connect() {
        const host = `http://localhost:${this.port}`;
        
        this.socket = io(host);

        this.socket.on(CONNECTED, this._onConnected);
        this.socket.on(DISCONNECTED, this._onDisconnected);
        //this.socket.on(CONNECT_ERR, this._onError);
        //this.socket.on(GUEST_SET, this._setGuest);
    }

    _onConnected() {
        this._identifyGuest();
        this.socket.on(INCOMING_MESSAGE, this.onMessage);
        this.onChange(true);
    }

    _identifyGuest() {
        const identMessage = {
            guest_cookie: Cookies.get('guest_cookie'),
            lc_license: (window.__lc ? window.__lc.license : 0)
        }
        this.socket.emit(IDENTIFY_GUEST, identMessage);
    }

    _setGuest(data) {
        console.log(data);
    }


    _onDisconnected(){
        this.onChange(false);
    }

    _sendIm(message) {
        this.socket.emit(INCOMING_MESSAGE, message);
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