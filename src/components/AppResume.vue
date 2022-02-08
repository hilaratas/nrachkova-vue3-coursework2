<template>
  <div v-if="!resumeBlocks.length"><h3>Добавьте первый блок, чтобы увидеть результат</h3></div>
  <template v-else>
    <template v-for="rb in resumeBlocks">
      <component :is="'app-resume-' + rb.type"
                 :content=rb.content
                 :id="rb.id"
                 @edit-block="$emit('editBlock', $event)"
                 @remove-block="$emit('removeBlock', $event)"
      ></component>
    </template>
  </template>
</template>

<script>
import AppResumeTitle from '@/components/AppResumeTitle'
import AppResumeSubtitle from '@/components/AppResumeSubtitle'
import AppResumeAvatar from '@/components/AppResumeAvatar'
import AppResumeText from '@/components/AppResumeText'

export default {
  name: "AppResume",
  emits: ['editBlock', 'removeBlock'],
  props: {
    resumeBlocks: {
      type: Array,
      required: true
    }
  },
  methods: {
    editBlock ($event) {
      console.log($event)
    }
  },
  components: { AppResumeTitle, AppResumeSubtitle, AppResumeAvatar, AppResumeText }
}
</script>

<style scoped>

</style>