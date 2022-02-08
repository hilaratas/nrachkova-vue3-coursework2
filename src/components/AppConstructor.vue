<template>
  <form @submit.prevent="handleSubmit" >
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select name="type" id="type" v-model="type" >
        <option v-for="ts in types" :value="ts.value">{{ ts.text }}</option>
      </select>
    </div>

    <div class="form-control">
      <label for="content">Значение</label>
      <textarea name="content" id="content" rows="3" v-model.trim="content"></textarea>
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
  emits: ['submitForm'],
  computed: {
    isDisabled() {
      return this.content.length < 3;
    }
  },
  methods: {
    handleSubmit() {
      const data = {
        type: this.type,
        content: this.content
      }
      this.$emit('submitForm', data)
    }
  }
}
</script>

<style scoped>

</style>