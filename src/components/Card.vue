<template>
<div class="card mt-4">
    <div class="container-image">
        <img :src="item.image" class="card-img-top" alt="...">
    </div>
  <div class="card-body">
    <h5 class="card-title">{{item.title}}</h5>
    <p class="card-text">{{item.description}}</p>
    <h4>Rp. {{item.status}}</h4>
    <button class="btn btn-warning" @click="$emit('event-update', item)">update</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    item: {
      type: Object
    }
  }
}
</script>

<style scoped>
.container-image{
    width: 100%;
    height: 180px;
    /* background-color: red; */
}
.card{
    border-radius: 10px;
}
.container-image img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
