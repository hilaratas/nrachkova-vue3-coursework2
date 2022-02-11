<template>
  <div class="container">
    <app-alert v-if="error" class="alert danger" @close="error = null" :error="error">
    </app-alert>
  </div>
  <div class="container column relative">
    <div class="card card-w30">
      <app-constructor
          :formProps="form"
          :resetFlag = "resetFlag"
          @submit-form="onSubmit"
      >
      </app-constructor>
    </div>
    <div class="card card-w70">
      <app-resume
          :resume-blocks="resumeBlocks"
          @edit-block="onEditResumeBlock"
          @remove-block="onRemoveResumeBlock"
      >
      </app-resume>
    </div>
  </div>

  <app-comments @error="onError"></app-comments>
</template>

<script>
import AppConstructor from "@/components/AppConstructor";
import AppComments from "@/components/AppComments";
import AppResume from "@/components/AppResume";
import AppAlert from "@/components/AppAlert";
import {URL} from "@/components/constants";
import axios from "axios";

export default {
  data() {
    return {
      resumeBlocks: [],
      form: {
        id: 0,
        type: 'title',
        content: ''
      },
      comments: {
        isLoading: false,
        comments: null
      },
      resetFlag: Date.now(),
      error: null
    }
  },
  mounted() {
    this.loadResumeBlocksFB();
  },
  methods: {
    async onSubmit(data) {
      const {id, type, content} = data;
      const resumeBlock = {type, content};
      const mode = !id ? 'add' : 'edit';

      mode === 'add' ?  await this.addResumeData(resumeBlock) : await this.editResumeData(id, resumeBlock);
      await this.loadResumeBlocksFB();
    },
    async addResumeData(resumeBlock) {
      if ( this.firstIsNotTitle(type) ) {
        this.error = `Ваше резюме надо начать с заголовка.<br>Сначала создайте запись типа "Заголовок". <br>Потом можете создавать запись любого типа в любом порядке.`;
        return;
      }
      this.error = null;
      await this.createResumeBlockFB(resumeBlock);
      this.resetFlag = Date.now();
    },
    async editResumeData(id, resumeBlock){
      await this.editResumeBlockFB(id, resumeBlock);
      this.resetFlag = Date.now();
    },
    firstIsNotTitle(type) {
      return !this.resumeBlocks.length && type !== 'title'
    },
    onError(message) {
      this.error = message;
    },
    onEditResumeBlock(id) {
      const resumeBlock = this.resumeBlocks.find(e => e.id === id)
      Object.keys(this.form).forEach(key => this.form[key] = resumeBlock[key])
      console.log(this.form)
    },
    async loadResumeBlocksFB () {
      try {
        const {data} = await axios.get(`${URL}/resume.json`)
        if ( data === null) {
          this.resumeBlocks = []
          return;
        }
        this.resumeBlocks = Object.keys(data).map(key => ({id: key, ...data[key]}))
      } catch (e) {
        this.error = e.message;
      }
    },
    async createResumeBlockFB (data ) {
      try {
        await axios.post(`${URL}/resume.json`, data)
      } catch (e) {
        this.error = e.message;
      }
    },
    async editResumeBlockFB (id, newData) {
      try {
        await axios.put(`${URL}/resume/${id}.json`,{ id, ...newData})
        await this.loadResumeBlocksFB();
      } catch (e) {
        this.error = e.message;
      }

    },
    async onRemoveResumeBlock (id) {
      try {
        await axios.delete(`${URL}/resume/${id}.json`)
        await this.loadResumeBlocksFB();
      } catch (e) {
        this.error = e.message;
      }
    }
  },
  components: {AppResume, AppAlert, AppComments, AppConstructor}
}
</script>
