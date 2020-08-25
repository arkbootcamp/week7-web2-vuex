import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`

export default new Vuex.Store({
  state: {
    count: 1,
    username: 'muhammad risano',
    todos: [],
    user: {},
    token: localStorage.getItem('token') || null,
    books: []
  },
  mutations: {
    setMinus (state) {
      state.count++
    },
    setPlush (state) {
      state.count--
    },
    setTodos (state, payload) {
      state.todos = payload
    },
    setUser (state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setBooks (state, payload) {
      // console.log(payload)
      state.books = payload
    }
  },
  actions: {
    getTodos (setex) {
      axios.get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => {
          setex.commit('setTodos', res.data)
        })
    },
    interceptorsResponse () {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        console.log(error)
        return Promise.reject(error)
      })
    },
    interceptorsRequest (setex) {
      console.log('interse')
      axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${setex.state.token}`
        return config
      }, function (error) {
        // Do something with request error
        return Promise.reject(error)
      })
    },
    login (setex, payload) {
      console.log(payload)
      // console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:4017/api/v1/users/login', payload)
          .then((res) => {
            console.log(res)
            setex.commit('setUser', res.data.result)
            localStorage.setItem('token', res.data.result.token)
            axios.defaults.headers.common.Authorization = `Bearer ${res.data.result.token}`
            resolve(res.data.result[0])
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getBooks (setex) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:4017/api/v1/books')
          .then((res) => {
            // console.log(res)
            setex.commit('setBooks', res.data.result)
            resolve(res.data.result)
          })
          .reject((err) => {
            console.log(err)
            reject(err)
          })
      })
    }
  },
  getters: {
    getCount (state) {
      return state.count * 2
    },
    getTodos (state) {
      return state.todos
    },
    isLogin (state) {
      return state.token !== null
    },
    books (state) {
      console.log(state.books)
      return state.books
    }
  },
  modules: {
  }
})
