<template>
  <div class="container">
    <div v-if="isLoading">
      <div class="loader"></div>
    </div>
    <p v-else-if="comments === null">
      <button class="btn primary" @click="loadComments">Загрузить комментарии</button>
    </p>
    <div v-else-if="!comments.length" class="card">
      <h2>Список коментариев пуст</h2>
      Попробуйте обновить список комментариев позднее.
      <br><br>
      <button class="btn primary" @click="loadComments">Обновить комментарии</button>
    </div>
    <div v-else class="card">
      <h2>Комментарии</h2>
      <ul class="list">
        <li v-for="c in comments" class="list-item">
          <div>
            <p><strong>{{c.email}}</strong></p>
            <div class="pre">{{c.body}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AppComments",
  emits: ['error'],
  data: () => ({
    isLoading: false,
    comments: null
  }),
  methods: {
    loadComments() {
      let context = this;
      context.isLoading = true;
      setTimeout(async function() {
        try {
          const {data} = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=42')
          if (!data) {
            throw new Error('Что-то пошло не так')
          }
          context.comments = data;
        } catch (e) {
          context.error = e.message;
          context.$emit('error', e.message);
        }
        context.isLoading = false;
      }, 2000);
    }
  }
}
</script>

<style scoped>

</style>