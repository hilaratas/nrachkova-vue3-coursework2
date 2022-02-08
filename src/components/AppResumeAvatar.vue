<template>
  <div class="relative">
  <div class="avatar">
    <img :src="content " alt="">
    <div class="absolute" style="top: 0; right: 0">
<!--      <button class="btn primary" @click="$emit('editBlock', id)" :data-id="id">р</button>-->
      <button class="btn danger" @click="$emit('removeBlock', id)" :data-id="id">X</button>
    </div>
  </div>
  </div>

</template>

<script>
import resumeMixin from "@/mixins/resumeMixin";
export default {
  name: "AppImage",
  mixins: [resumeMixin]
}
</script>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 150px;
  height: auto;
  border-radius: 50%;
}
</style>