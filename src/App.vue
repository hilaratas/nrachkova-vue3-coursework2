<template>
  <div class="container">
    <app-alert v-if="error" class="alert danger" @close="error = null" :error="error">
    </app-alert>
  </div>
  <div class="container column relative">
    <form class="card card-w30" @submit.prevent="submitHdl" >
      <div class="form-control">
        <label for="type">Тип блока</label>
        <select name="type" id="type" v-model="form.type">
          <option v-for="bt in types" :value="bt.value">{{ bt.text }}</option>
        </select>
      </div>

      <div class="form-control">
        <label for="value">Значение</label>
        <textarea name="content" id="value" rows="3" v-model.trim="form.content"></textarea>
      </div>

      <button type="submit" class="btn primary" :disabled="isDisabled">Добавить</button>
    </form>

    <div class="card card-w70">
      <div v-if="!resumeBlocks.length"><h3>Добавьте первый блок, чтобы увидеть результат</h3></div>
      <div v-else>
        <div v-for="rb in resumeBlocks">
            <component :is="'app-' + rb.type"
                       :content=rb.content
            ></component>
        </div>
      </div>
    </div>
  </div>

  <app-comments @error="errorHdl"></app-comments>
</template>

<script>
import AppTitle from '@/components/AppTitle'
import AppSubtitle from '@/components/AppSubtitle'
import AppAvatar from '@/components/AppAvatar'
import AppText from '@/components/AppText'
import AppAlert from "@/components/AppAlert";
import AppComments from "@/components/AppComments";

export default {
  data() {
    return {
      types: [
        {value: 'title', text: 'Заголовок'},
        {value: 'subtitle', text: 'Подзаголовок'},
        {value: 'avatar', text: 'Аватар'},
        {value: 'text', text: 'Текст'},
      ],
      resumeBlocks: [], // {typeBlock, content }
      form: {
        type: 'title',
        content: ''
      },
      formDefaults: {
        type: 'title',
        content: ''
      },
      comments: {
        isLoading: false,
        comments: null
      },
      error: null
    }
  },
  computed: {
    isDisabled() {
      return this.form.content.length < 3;
    }
  },
  methods: {
    submitHdl() {
      let {type, content} = this.form;
      if ( this.firstIsNotTitle() ) {
        this.error = `Ваше резюме надо начать с заголовка.<br>
          Сначала создайте запись типа "Заголовок". Потом можете создавать запись любого типа в любом порядке.`;
        return;
      }
      this.error = null;
      let resumeBlock = {type, content};
      this.resumeBlocks.push(resumeBlock);
      this.resetForm();
    },
    resetForm() {
      //this.form = this.formDefaults // Так не работает. Почему?
      Object.keys(this.form).forEach(key => this.form[key] = this.formDefaults[key])
    },
    firstIsNotTitle() {
      return !this.resumeBlocks.length && this.form.type !== 'title'
    },
    errorHdl(message) {
      console.log(message);
      this.error = message;
    }
  },
  components: {AppTitle, AppSubtitle, AppAvatar, AppText, AppAlert, AppComments}
}
</script>

<style>
  .avatar {
    display: flex;
    justify-content: center;
  }

  .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
  .pre {
    white-space: pre-line;
  }
</style>
