<template>
    <div class="chat-view">
        <div 
            id="messages"
            class="chat-view-messages">
            <div 
                class="chat-view-info"
                v-if="getMessages.length <= 0">
                Do you have any question? <br> Contact us below! :) 
            </div>
            <div
                v-for="message in getMessages"
                v-bind:key="message.id"
                v-bind:class="styleChatMessage(message)"
                class="chat-view-message">

                <span>{{message.message}}</span>
            </div>
        </div> 
        <div class="chat-view-input">
            <div class="chat-view-input-message">
                <input 
                    v-model="message"
                    v-on:keyup.enter="sendChatMessage"
                    placeholder="Enter message!">
                <div 
                    class="chat-view-input-message-send"
                    v-on:click="sendChatMessage">
                    <img src="https://image.flaticon.com/icons/svg/481/481673.svg" alt="">
                </div>
            </div>
        </div> 
    </div> 
</template>

<script>
import _ from 'lodash';
import {mapState, mapGetters} from 'vuex';

export default {    
    props: {
        sendChatMessageToServer: {type: Function}
    },
    data: function() {
        return {
            message: '',
        }
    },
    methods: {
        styleChatMessage: function(message) {
            return { 
                'chat-view-message-left': message.from_admin,
                'chat-view-message-right': !message.from_admin
            };
        },
        sendChatMessage: function() {
            if(!this.message) return;
            this.sendChatMessageToServer(this.message);
            this.message = "";
        }
    },
    computed: {
        ...mapGetters({
            getMessages: 'chat/getMessages'
        }),
    },
    updated: function() {
        if(!this.$el.querySelector) return;
        var container = this.$el.querySelector("#messages");
        if(!container) return;
        container.scrollTop = container.scrollHeight;
    },
}
</script>

<style lang="scss">
    @import "../styles/_variables";

    .chat-view {
        width: 100%;
        height: calc(#{$window-height} - #{$window-header-height});
        
        &-messages {
            overflow-y: scroll;
            height: calc(#{$window-height} - #{$window-header-height} - #{$window-header-height});
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
                margin: 4px 8px;
                padding: 8px 16px;
                border-radius: 16px;
                display: inline-block;
            }
        }
        &-input {
            height: $window-chat-input-height;
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
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
        &-info {
            text-align: center;
            padding-top: 128px;
        }
    }
    
</style>