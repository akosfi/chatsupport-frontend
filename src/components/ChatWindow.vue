<template>
    <div>
      <div v-if="isChatWindowVisible" class="chat-window">
        <div v-on:click="closeChatWindow" class="chat-window-header">
            
        </div>
        <div class="chat-view">
            <div class="chat-view-messages">
                <div class="chat-view-message chat-view-message-left">
                    <span>Hi! Left</span>
                </div>
                <div class="chat-view-message chat-view-message-right">
                    <span>Hi! Right</span>
                </div>
            </div> 
            <div class="chat-view-input">
                asd
            </div> 
        </div> 
      </div>

      <div v-if="!isChatWindowVisible" class="chat-button" v-on:click="openChatWindow">
        
      </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      isChatWindowVisible: true
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

      & .chat-view {
          width: 100%;
          height: calc(512px - 48px);
          display: flex;
          flex-direction: column;

          &-messages {
              flex: 1 0 auto;
          }
          &-message {
              width: 100%;

              $chat-message: &;

              &-left {
                text-align: left;
              }
              &-right {
                text-align: right;
              }
              & > span {
                background: #5ea7ff;
                padding: 8px 16px;
                display: inline-block;
                color: white;
              }
          }
          &-input {
            flex: 0 0 48px;
            background: pink;
            border-bottom-right-radius: 15px;
            border-bottom-left-radius: 15px;
          }
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