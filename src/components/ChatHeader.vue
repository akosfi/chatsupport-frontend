<template>
    <div class="chat-header">
        <div class="chat-header-content">
            <div class="chat-header-options">...</div>
            <div class="chat-header-title">Chat with us!</div>
            <div 
            v-on:click="closeChatWindow"
            class="chat-header-minimalize">_</div>
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      
    }
  },
  components: {
    
  },
  methods: {
    
  },
  props: {
    closeChatWindow: {type: Function}
  },
}
</script>

<style lang="scss">
    @import "../styles/_variables";

    .chat-header {
        @include set-window-top-border;
        width: 100%;
        height: $window-header-height;
        background: $window-header-color;
        display: flex;
        align-items: center;


        &-content {
            padding: 0 16px;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        &-options {

        }
        &-title {

        }
        &-minimalize {
            cursor: pointer;
        }
    }
    
</style>