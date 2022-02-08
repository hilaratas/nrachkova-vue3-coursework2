<template>
  <form @submit.prevent="handleSubmit" >
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select name="type" id="type" v-model="blockType" >
        <option v-for="ts in types" :value="ts.value" :key="ts.value">{{ ts.text }}</option>
      </select>
    </div>

    <div class="form-control">
      <label for="content">Значение</label>
      <textarea name="content" id="content" rows="3" v-model.trim="blockContent"></textarea>
    </div>

    <button type="submit" class="btn primary" :disabled="isDisabled">Добавить</button>
  </form>
</template>

<script>
export default {
  name: "AppConstructor",
  props: {
    types: {
      type: Array,
      required: true
    },
    id: {
      type: [String, null],
      required: true
    },
    type: {
      type: String,
      required: true,
      default: 'title'
    },
    content: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      blockId: this.id,
      blockType: this.type,
      blockContent: this.content
    }
  },
  emits: ['submitForm'],
  computed: {
    isDisabled() {
      return this.blockContent.length < 3;
    }
  },
  methods: {
    handleSubmit() {
      const data = {
        type: this.blockType,
        content: this.blockContent
      }
      this.$emit('submitForm', data)
    }
  },
  updated() {
    console.log('props:', this.id, this.type, this.content)
    console.log('data:', this.blockId, this.blockType, this.blockContent)
  }
}
</script>

<style scoped>

</style>