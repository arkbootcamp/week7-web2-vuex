<template>
    <div>
        <ul class="list-unstyled">
            <li class="media"  v-for="item in getCart" :key="item.id">
                <div class="container-img">
                    <img :src="item.image" class="mr-3">
                </div>
                <div class="media-body">
                <h6 class="mt-0 mb-1">{{item.title}}</h6>
                <div class="cart-body">
                <div class="count-box">
                    <button> -
                </button>
                <input type="number" name="count" value="1" disabled>
                <button>+</button>
                </div>
                <h5>{{item.status}}</h5>
                </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getCart'])
  }
}
</script>

<style scoped>
.count-box input{
    width: 30px;
    font-size: 12px;
}
.cart-body{
    display: flex;
    justify-content: space-between;
}
.container-img{
    width: 70px;
    height: 70px;
    margin-right: 10px;
}
.container-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.media{
    margin-bottom: 20px;
}
</style>
