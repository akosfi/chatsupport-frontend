<template>
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
</template>

<script>
export default {
  data: function() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
    
    .chat-view {
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
    
</style>