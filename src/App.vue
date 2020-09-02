<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
        <router-link to="/product">Product</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorsRequest', 'interceptorsResponse'])
  },
  created () {
    console.log('hello')
    this.interceptorsRequest()
    this.interceptorsResponse()
  }
}
</script>
