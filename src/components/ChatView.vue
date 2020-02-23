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
    @import "../styles/_variables";


    .chat-view {
        width: 100%;
        height: calc(#{$window-height} - #{$window-header-height});
        display: flex;
        flex-direction: column;

        &-messages {
            flex: 1 0 auto;
        }
        &-message {
            width: 100%;

            &-left {
                text-align: left;
                
                & > span {
                    background: $message-received-color;    
                    color: $message-received-font-color;
                }
            }
            &-right {
                text-align: right;

                & > span {
                    background: $message-sent-color; 
                    color: $message-sent-font-color;   
                }
            }
            & > span {
                padding: 8px 16px;
                display: inline-block;
            }
        }
        &-input {
            flex: 0 0 48px;
            @include set-window-bottom-border;
            position: relative;

            &-message {
                height: 100%;
                & input {
                    width: 100%;
                    @include set-window-bottom-border;
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