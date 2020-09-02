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

    <input type="file" @change="uploadFile" name="image" id="image" ref="input">
    <button @click="handleUpdate">kirim</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      username: '',
      password: '',
      title: 'hello ini coba patch saja',
      description: 'coba patch',
      image: null,
      status: 1,
      idCategory: 1,
      author: 'risano',
      id: 1
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
    uploadFile (e) {
      console.log(this.$refs)
      console.log(e.target.files[0])
      this.image = e.target.files[0]
    },
    handleUpdate () {
      const fd = new FormData()
      fd.append('title', this.title)
      fd.append('description', this.description)
      fd.append('image', this.image)
      fd.append('status', this.status)
      fd.append('idCategory', this.idCategory)
      fd.append('author', this.author)
      axios.patch(`http://localhost:4017/api/v1/books/${this.id}`, fd)
        .then(() => {
          alert('berhasil')
        })
        .catch((err) => {
          console.log(err)
        })
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
