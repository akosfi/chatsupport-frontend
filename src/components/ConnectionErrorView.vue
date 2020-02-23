<template>
    <div>
      Trouble connecting to server!
      <button v-on:click="reconnectToSocket">Reconnect</button>
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

    
    
</style>