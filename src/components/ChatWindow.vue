<template>
    <div>
      <div v-if="isChatWindowVisible" class="chat-window">
        <div v-on:click="closeChatWindow" class="chat-window-header"></div>

        <chat-view></chat-view>
      </div>

      <div v-if="!isChatWindowVisible" class="chat-button" v-on:click="openChatWindow"></div>
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
    .chat-window{
      position: fixed;
      z-index: 10000000;
      right: 16px;
      bottom: 16px;
      width: 256px;
      height: 512px;
      border-radius: 15px;
      background: #f2f2f2;
      box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.43);

      &-header {
          width: 100%;
          height: 48px;
          background: white;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
      }
    }
    .chat-button {
      position: fixed;
      right: 16px;
      bottom: 16px;
      width: 56px;
      height: 56px;
      cursor: pointer;
      border-radius: 100%;
      box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.43);
      background: goldenrod;
    }
    
</style>