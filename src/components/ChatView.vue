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
            <div class="chat-view-input-message">
                <input v-model="message" placeholder="Enter message!">
                <div class="chat-view-input-message-send"></div>
            </div>
        </div> 
    </div> 
</template>

<script>
export default {
  data: function() {
    return {
      message: '',
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
            position: relative;

            &-message {
                height: 100%;
                & input {
                    width: 100%;
                    border-bottom-right-radius: 15px;
                    border-bottom-left-radius: 15px;
                    border: none;
                    padding: 8px;
                    padding-right: 60px;
                    height: 100%;
                    box-sizing: border-box;
                }
                &-send {
                    height: 24px;
                    width: 24px;
                    cursor: pointer;
                    border-radius: 100%;
                    background: #5ea7ff;
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
    
</style>