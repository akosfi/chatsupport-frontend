<template>
    <chat-window></chat-window>
</template>

<script>
import ChatWindow from './components/ChatWindow.vue';

export default {
  name: 'App',
  components: {
    ChatWindow,
  },
  data: function() {
    return {
      isChatWindowVisible: false
    }
  },
  methods: {
    closeChatWindow: function() {
      this.isChatWindowVisible = false; 
    },
    openChatWindow: function() {
      this.isChatWindowVisible = true;
    }
  }
}
</script>

<style lang="scss">
    
</style>