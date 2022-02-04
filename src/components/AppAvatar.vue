<template>
  <div class="avatar">
    <img :src="content " alt="">
  </div>
</template>

<script>
export default {
  name: "AppImage",
  props: ['content']
}
</script>

<style scoped>

</style>