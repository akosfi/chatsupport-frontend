<template>
    <div class="error-view">
      <div class="error-view-content">
        <span class="error-view-content-head">Trouble connecting to server!</span>
        <span 
        class="error-view-content-button"
        v-on:click="reconnectToSocket"
        >Reconnect</span>
      </div>
    </div>
</template>

<script>

export default {
  props: {
    reconnectToSocket: {type: Function}
  },
  data: function() {
    return {
      
    }
  },
  components: {
  },
  methods: {
  },

  created: function() {
  },
}
</script>

<style lang="scss">
    @import "../styles/_variables";

    .error-view {
      position: relative;

      &-content {
        text-align: center;
        margin-top: 128px;

        &-head {
          font-size: 24px;
          display: block;
        }
        &-button {
          margin-top: 16px;
          font-size: 16px;
          display: inline-block;
          cursor: pointer;
          padding: 8px 16px;
          background: $primary-button-background-color;
          color: $primary-button-font-color;
          border-radius: 16px;
        }
      }
    }
    
</style>