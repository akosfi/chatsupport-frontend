<template>
    <div>
      <div v-if="isChatWindowVisible" class="chat-window">
        <div v-on:click="closeChatWindow" class="chat-window-header"></div>

        <chat-view
          v-if="connectedToSocket"
          :sendChatMessageToServer="sendChatMessageToServer"
          ></chat-view>

        <connection-error-view 
          v-if="!connectedToSocket && triedConnectingToSocket"
          :reconnectToSocket="reconnectToSocket"
          ></connection-error-view>
      </div>

      <div v-if="!isChatWindowVisible" class="chat-widget" v-on:click="openChatWindow"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import ChatView from './ChatView';
import ConnectionErrorView from './ConnectionErrorView';
import ChatSocket from '../socket';

const chatSocket = new ChatSocket(); 

export default {
  data: function() {
    return {
      isChatWindowVisible: true
    }
  },
  components: {
    ChatView,
    ConnectionErrorView
  },
  methods: {
    closeChatWindow: function() {
      this.isChatWindowVisible = false; 
    },
    openChatWindow: function() {
      this.isChatWindowVisible = true;
    },
    reconnectToSocket: function () {
      chatSocket._connect();
    },
    sendChatMessageToServer: function (message) {
      chatSocket._sendIm(message);
    }
  },
  computed: mapState({
    triedConnectingToSocket: state => state.socket.triedConnecting,
    connectedToSocket: state => state.socket.connected,
  }),
  created: function() {
    chatSocket.onChange = (connected) => this.$store.dispatch('socket/changeConnectionStatus', {connected});
    chatSocket.onMessage = (message) => this.$store.dispatch('chat/addMessage', {message: message.message});
    chatSocket.onConnectError = () => console.log("asd");
    chatSocket._connect();
  },
}
</script>

<style lang="scss">
    @import "../styles/_variables";

    .chat-window{
      @include set-window-position;
      width: $window-width;
      height: $window-height;
      border-radius: $window-border-radius;
      background: $window-background-color;
      box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.43);

      &-header {
          width: 100%;
          height: $window-header-height;
          background: $window-header-color;
          @include set-window-top-border;
      }
    }
    .chat-widget {
      @include set-window-position;
      width: $window-widget-size;
      height: $window-widget-size;
      cursor: pointer;
      border-radius: 100%;
      box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.43);
      background: goldenrod;
    }
    
</style>