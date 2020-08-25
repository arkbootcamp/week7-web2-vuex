<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>jumlah count {{count}}</h1>
    <button @click="setMin">-</button>
    <button @click="setPlush">+</button>

    <ul>
      <li v-for="book in books" :key="book.id">{{book.title}}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin () {
      const data = {
        username: this.username,
        password: this.passowrd
      }
      this.login(data)
    },
    setPlush () {
      // console.log('set')
      // this.$store.commit('setMinus')
    },
    setMin () {
      // console.log('set')
      // this.$store.commit('setPlush')
    },
    ...mapActions(['getTodos', 'login', 'getBooks'])
  },
  computed: {
    // username () {
    //   // return this.$store.state.count
    //   return this.$store.getters.getCount
    // },
    // todos () {
    //   return this.$store.getters.getTodos
    // }
    // ...mapGetters(['getCount', 'getTodos'])
    ...mapGetters({
      count: 'getCount',
      todos: 'getTodos',
      books: 'books'
    })
  },
  mounted () {
    this.getBooks()
  }
}
</script>
