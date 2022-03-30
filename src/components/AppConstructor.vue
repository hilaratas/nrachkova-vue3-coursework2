<template>
  <form @submit.prevent="$emit('submitForm', formData)" >
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select name="type" id="type" v-model="formData.type" >
        <option v-for="ts in TYPES" :value="ts.value" :key="ts.value">{{ ts.text }}</option>
      </select>
    </div>

    <div class="form-control">
      <label for="content">Значение</label>
      <textarea name="content" id="content" rows="3" v-model.trim="formData.content"></textarea>
    </div>

    <button type="submit" class="btn primary" :disabled="isDisabled">Добавить</button>
  </form>
</template>

<script>
import {TYPES, FORM_DEFAULTS} from "@/components/constants";

export default {
  name: "AppConstructor",
  props: {
    formProps: {
      type: Object // {id: [String | Null], type: String, content: String}
    },
    resetFlag: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      formData: this.formProps,
    }
  },
  emits: ['submitForm'],
  beforeCreate() {
    this.TYPES = TYPES;
  },
  computed: {
    isDisabled() {
      return this.formData.content.length < 3;
    }
  },
  methods: {
  },
  watch: {
    formProps:{
      handler(newFormProps) {
        console.log('Ну и ну')
        this.formData = newFormProps
      },
      deep: true
    },
    resetFlag() {
      console.log('Флаг изменен')
      this.formData = {
        id: 0,
        ...FORM_DEFAULTS
      }
    }
  }
}
</script>

<style scoped>

</style>