import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { CONNECTED, DISCONNECTED, INCOMING_MESSAGE, IDENTIFY_GUEST, GUEST_MESSAGES_GET, GUEST_MESSAGES_SEND, IDENTIFYING_GUEST_SUCCEEDED, GUEST_COOKIE_SET } from './constants';


class ChatSocket {

    constructor() {
        this.port = 3000;
        this.onChange = null;
        this.onMessage = null;
        this.onMessages = null;

        this.connect = this.connect.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.sendIm = this.sendIm.bind(this);

        
        this._identifyGuest = this._identifyGuest.bind(this);
        this._onIdentifySuccedeed = this._onIdentifySuccedeed.bind(this); 

        this._onConnected = this._onConnected.bind(this);
        this._onDisconnected = this._onDisconnected.bind(this);
        this._onError = this._onError.bind(this);

        this._onCookieSet = this._onCookieSet.bind(this);
        this._getMessages = this._getMessages.bind(this);
    }

    connect() {
        const host = `http://localhost:${this.port}`;
        
        this.socket = io(host);

        this.socket.on(CONNECTED, this._onConnected);
        this.socket.on(DISCONNECTED, this._onDisconnected);
        this.socket.on(IDENTIFYING_GUEST_SUCCEEDED, this._onIdentifySuccedeed);
        this.socket.on(GUEST_MESSAGES_SEND, this.onMessages);
        this.socket.on(GUEST_COOKIE_SET, this._onCookieSet);
    }


    sendIm(message) {
        this.socket.emit(INCOMING_MESSAGE, {message});
    } 

    disconnect() {
        this._onDisconnected();
        this.socket.close();
    }

    _onConnected() {
        this._identifyGuest();
        this.socket.on(INCOMING_MESSAGE, this.onMessage);
        this.onChange(true);
    }

    _onIdentifySuccedeed() {
        this._getMessages();
    }

    _identifyGuest() {
        const identMessage = {
            guest_cookie: Cookies.get('guest_cookie'),
            lc_license: (window.__lc ? window.__lc.license : 111)
        }
        this.socket.emit(IDENTIFY_GUEST, identMessage);
    }

    _onDisconnected(){
        this.onChange(false);
    }

    _onCookieSet(data) {
        Cookies.set('guest_cookie', data.guest_cookie);
    }

    _getMessages() {
        this.socket.emit(GUEST_MESSAGES_GET);
    }

    _onError(message) {
        this.onConnectError();
        this._disconnect();
    };
}

export default new ChatSocket();