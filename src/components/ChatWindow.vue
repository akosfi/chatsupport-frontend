<template>
    <div>
      <div v-if="isChatWindowVisible" class="chat-window">
        <chat-header
          :closeChatWindow="closeChatWindow"
        ></chat-header>

        <chat-view
          v-if="isConnected"
          :sendChatMessageToServer="sendChatMessageToServer"
          ></chat-view>

        <connection-error-view 
          v-if="!isConnected && triedConnectingToSocket"
          :reconnectToSocket="reconnectToSocket"
          ></connection-error-view>
      </div>

      <div v-if="!isChatWindowVisible" class="chat-widget" v-on:click="openChatWindow">
        <div>
          <img src="https://image.flaticon.com/icons/svg/481/481673.svg" alt="">
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ChatHeader from './ChatHeader';
import ChatView from './ChatView';
import ConnectionErrorView from './ConnectionErrorView';

export default {
  data: function() {
    return {
      isChatWindowVisible: true
    }
  },
  components: {
    ChatHeader,
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
    sendChatMessageToServer: function (message) {
      this.$store.dispatch('socket/sendMessageAction', {message});
    },
  },
  computed: {
    ...mapGetters({
      triedConnectingToSocket: 'socket/hasTriedConnecting',
      isConnected: 'socket/isConnected',
    }),
  },
  mounted: function() {
    this.$store.dispatch('socket/connectAction');
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
    }
    .chat-widget {
      @include set-window-position;
      width: $window-widget-size;
      height: $window-widget-size;
      cursor: pointer;
      border-radius: 100%;
      box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.43);
      background: $primary-button-background-color;
      
      & > div {
        position: relative;
        width: 100%;
        height: 100%;
        & > img {
          position: absolute;
          top: 50%;
          left: 45%;
          transform: translate(-50%,-50%);
          width: 70%;
        }
      }
    }
    
</style>