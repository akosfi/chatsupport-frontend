<template>
    <chat-window></chat-window>
</template>

<script>
import ChatWindow from './components/ChatWindow.vue';
import ChatSocket from './socket';

export default {
  name: 'App',
  components: {
    ChatWindow,
  },

  data: function() {
    return {
      
    }
  },

  created: function() {
    const chatSocket = new ChatSocket(); 
    chatSocket.onChange = () => this.$store.dispatch('socket/connectSocket');
    chatSocket.onMessage = () => console.log("message received!");
    chatSocket.connect();
  },

  methods: {  }
}
</script>