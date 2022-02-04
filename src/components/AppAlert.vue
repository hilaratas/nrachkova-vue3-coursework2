<template>
<div class="alert" >
  <div v-html="error"></div>
  <hr>
  <button class="btn danger" @click="$emit('close')">Закрыть</button>
</div>
</template>

<script>
export default {
  name: "AppAlert",
  props: ['error'],
  emits: ['close']
}
</script>

<style scoped>

</style>