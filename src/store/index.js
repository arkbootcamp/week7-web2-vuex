import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`

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
    setToken (state, payload) {
      state.token = payload
    },
    setBooks (state, payload) {
      // console.log(payload)
      state.books = payload
    }
  },
  actions: {
    getTodos (context) {
      axios.get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => {
          context.commit('setTodos', res.data)
        })
    },
    interceptorsResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        console.log(error.response.data.result.message)
        if (error.response.status === 401) {
          if (error.response.data.result.message === 'Token Invalid') {
            context.commit('setToken', null)
            localStorage.removeItem('token')
            router.push('/login')
            alert('maaf anda tidak boleh merubah token dengan sendirinya')
          } else if (error.response.data.result.message === 'Token Expired') {
            context.commit('setToken', null)
            localStorage.removeItem('token')
            router.push('/login')
            alert('maaf session habis silahkan login kembali')
          }
        }
        return Promise.reject(error)
      })
    },
    interceptorsRequest (context) {
      axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${context.state.token}`
        return config
      }, function (error) {
        // Do something with request error
        return Promise.reject(error)
      })
    },
    login (context, payload) {
      console.log(payload)
      // console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:4017/api/v1/users/login', payload)
          .then((res) => {
            console.log(res)
            context.commit('setUser', res.data.result)
            localStorage.setItem('token', res.data.result.token)
            // axios.defaults.headers.common.Authorization = `Bearer ${res.data.result.token}`
            context.dispatch('interceptorsRequest')
            resolve(res.data.result[0])
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getBooks (context) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:4017/api/v1/books')
          .then((res) => {
            // console.log(res)
            context.commit('setBooks', res.data.result)
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
