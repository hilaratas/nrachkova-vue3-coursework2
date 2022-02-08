<template>
  <div class="relative">
    <p class="pre">{{ content }}</p>
    <div class="absolute" style="top: 0; right: 0">
<!--      <button class="btn primary" @click="$emit('editBlock', id)" :data-id="id">р</button>-->
      <button class="btn danger" @click="$emit('removeBlock', id)" :data-id="id">X</button>
    </div>
  </div>
</template>

<script>
import resumeMixin from "@/mixins/resumeMixin";
export default {
  name: "AppResumeText",
  mixins: [resumeMixin]
}
</script>

<style scoped>
.pre {
  white-space: pre-line;
}
</style>