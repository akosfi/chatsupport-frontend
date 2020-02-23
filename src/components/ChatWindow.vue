<template>
    <div>
      <div v-if="isChatWindowVisible" class="chat-window">
        <div v-on:click="closeChatWindow" class="chat-window-header"></div>

        <chat-view></chat-view>
      </div>

      <div v-if="!isChatWindowVisible" class="chat-widget" v-on:click="openChatWindow"></div>
    </div>
</template>

<script>
import ChatView from './ChatView';
import ChatSocket from '../socket';

export default {
  data: function() {
    return {
      isChatWindowVisible: true
    }
  },
  components: {
    ChatView
  },
  methods: {
    closeChatWindow: function() {
      this.isChatWindowVisible = false; 
    },
    openChatWindow: function() {
      this.isChatWindowVisible = true;
    }
  },

  created: function() {
    const chatSocket = new ChatSocket(); 
    chatSocket.onChange = () => this.$store.dispatch('socket/connectSocket');
    chatSocket.onMessage = () => console.log("message received!");
    //chatSocket.connect();
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