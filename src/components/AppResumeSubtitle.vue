<template>
  <div class="relative">
    <h2>{{ content }}</h2>
    <div class="absolute" style="top: 0; right: 0">
<!--      <button class="btn primary" @click="$emit('editBlock', id)" :data-id="id">р</button>-->
      <button class="btn danger" @click="$emit('removeBlock', id)" :data-id="id">X</button>
    </div>
  </div>

</template>

<script>
import resumeMixin from "@/mixins/resumeMixin";
export default {
  name: "AppResumeSubtitle",
  mixins: [resumeMixin]
}
</script>

<style scoped>

</style>