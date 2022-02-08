<template>
  <div class="container">
    <app-alert v-if="error" class="alert danger" @close="error = null" :error="error">
    </app-alert>
  </div>
  <div class="container column relative">
    <div class="card card-w30">
      <app-constructor
          :types="TYPES"
          :id="form.id"
          :type="form.type"
          :content="form.content"
          @submit-form="handleSubmit"
      >
      </app-constructor>
    </div>
    <div class="card card-w70">
      <app-resume
          :resume-blocks="resumeBlocks"
          @edit-block="editResumeBlock"
          @remove-block="removeResumeBlock"
      >

      </app-resume>
    </div>
  </div>

  <app-comments @error="handleError"></app-comments>
</template>

<script>
import AppConstructor from "@/components/AppConstructor";
import AppComments from "@/components/AppComments";
import AppResume from "@/components/AppResume";
import AppAlert from "@/components/AppAlert";
import {TYPES, FORM_DEFAULTS, URL} from "@/components/constants";
import axios from "axios";

export default {
  data() {
    return {
      resumeBlocks: [],
      form: {
        id: null,
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
  beforeCreate() {
    this.TYPES = TYPES;
    this.FORM_DEFAULTS = FORM_DEFAULTS;
  },
  mounted() {
    this.loadResumeBlocks();
  },
  methods: {
    async handleSubmit(data) {
      let {type, content} = data;
      if ( this.firstIsNotTitle(type) ) {
        this.error = `Ваше резюме надо начать с заголовка.<br>
          Сначала создайте запись типа "Заголовок". <br>
          Потом можете создавать запись любого типа в любом порядке.`;
        return;
      }
      this.error = null;
      let resumeBlock = {type, content};
      await this.createResumeBlock(resumeBlock);
      await this.loadResumeBlocks();
      this.resetForm();
    },
    resetForm() {
      Object.keys(this.form).forEach(key => this.form[key] = this.FORM_DEFAULTS[key])
      // this.form.id = null;
      // this.form.type = 'title';
      // this.form.content = '';
    },
    firstIsNotTitle(type) {
      return !this.resumeBlocks.length && type !== 'title'
    },
    handleError(message) {
      this.error = message;
    },
    async loadResumeBlocks ( data ) {
      try {
        const {data} = await axios.get(`${URL}/resume.json`)
        if ( data === null) {
          this.resumeBlocks = []
          return;
        }

        this.resumeBlocks = Object.keys(data).map(key => (
            {id: key,
              ...data[key]
            }
        ))
      } catch (e) {
        this.error = e.message;
      }
    },
    async createResumeBlock ( data ) {
      try {
        const response = await axios({
          method: 'post',
          url: `${URL}/resume.json`,
          data
        })
      } catch (e) {
        this.error = e.message;
      }
    },
    editResumeBlock (id) {
      let resumeBlock = this.resumeBlocks.find(e => e.id === id)
      //Object.keys(this.form).forEach(key => this.form[key] = resumeBlock[key])
      // this.form.id = resumeBlock.id;
      // this.form.type = resumeBlock.type;
      // this.form.content = resumeBlock.content;
      this.form = {...resumeBlock}
    },
    async removeResumeBlock (id) {
      try {
        let result = await axios.delete(`${URL}/resume/${id}.json`)
        await this.loadResumeBlocks();
      } catch (e) {
        this.error = e.message;
      }
    }
  },
  components: {AppResume, AppAlert, AppComments, AppConstructor}
}
</script>
