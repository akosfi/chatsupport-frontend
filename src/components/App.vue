<template>
  <div id="app">
    <p class="red">App componeasdas<span>aaaaaaaaaa</span>dasnt</p>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
    .red {
        background: red;
        & > span {
            color: white;
        }
    }
</style>