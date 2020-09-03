<template>
    <div>
        <div class="container-flui">
          <div class="row">
            <div class="col-md-5">
              <div class="form-group row">
            <label for="sort" class="col-sm-2 col-form-label">Sort</label>
                <div div class="col-sm-10">
                  <select id="sort" class="form-control" @change="setSort">
                    <option selected> - pilih - </option>
                  <option value="price">harga tertinggi</option>
                  <option value="title">nama product</option>
                </select>
          </div>
          </div>
            </div>
            <div class="col-md-4">
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Search</label>
                  <div class="col-sm-10">
                  <input type="text" class="form-control" id="inputPassword" v-on:keyup.enter="setSearch">
                </div>
            </div>
            </div>
            <div class="col-md-3">
              <h2><span class="badge badge-warning">{{countCart}}</span></h2>
            </div>
          </div>
            <div class="row">
                <div class="col-md-1">
                    <button class="btn btn-primary" @click="toggleModal">
                        add Data
                    </button>
                </div>
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-4" v-for="product in productstate" :key="product.id">
                            <Card
                            :item="product"
                            :active="checkProductActive(product.id)"
                            @event-update="setUpdate(product)"
                            @select-product="addCart(product)" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <Cart/>
                </div>
            </div>
            <div class="row">
              <Pagination :data="pagination" @fire-event="handlePagination"/>
            </div>
        </div>
        <Modal v-show="modalActive" :data="dataModal" @close-modal="toggleModal" @fire-event="handleEventModal"/>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Card from '../../../components/Card'
import Modal from '../../../components/Modal'
import Pagination from '../../../components/Pagination'
import Cart from './component/Cart'

export default {
  name: 'Product',
  components: {
    Card,
    Modal,
    Pagination,
    Cart
  },
  data: () => ({
    modalActive: false,
    dataModal: {
      id: null,
      title: '',
      description: '',
      image: null,
      idCategori: 0,
      author: ''
    }
  }),
  methods: {
    ...mapActions(['getProduct', 'insertProduct', 'editProduct', 'handleSearch']),
    ...mapMutations(['addCart']),
    toggleModal () {
      this.modalActive = !this.modalActive
      if (!this.modalActive) {
        this.clearModal()
      }
    },
    // addToCart (item) {

    // },
    setSort (e) {
      const url = `?sort=${e.target.value}`
      this.getProduct(url)
    },
    handleEventModal () {
      this.dataModal.id ? this.updateProduct() : this.addProdcut()
    },
    setSearch (e) {
      // this.handleSearch(e.target.value)
      const url = `?search=${e.target.value}`
      this.getProduct(url)
    },
    handlePagination (number) {
      const url = `?page=${number}`
      this.getProduct(url)
    },
    checkProductActive (id) {
      return this.getCart.find(item => {
        return item.id === id
      })
    },
    updateProduct () {
    //   alert('ini update prodcut')
    //   console.log('update product')

      const data = new FormData()
      data.append('title', this.dataModal.title)
      data.append('description', this.dataModal.description)
      data.append('image', this.dataModal.image)
      data.append('idCategory', this.dataModal.idCategori)
      data.append('author', this.dataModal.author)
      //   perbandingan
      //   const data = {
      //     title: this.dataModal.title,
      //     description: this.dataModal.description,
      //     image: this.dataModal.image,
      //     idCategory: this.dataModal.idCategori,
      //     author: this.dataModal.author
      //   }
      const container = {
        id: this.dataModal.id,
        data: data
      }
      this.editProduct(container)
        .then(res => {
          this.clearModal()
          this.getProduct()
          alert('insert berhasil')
        })
    },
    setUpdate (data) {
      this.modalActive = true
      this.dataModal.id = data.id
      this.dataModal.title = data.title
      this.dataModal.description = data.description
      this.dataModal.image = data.image
      this.dataModal.idCategori = data.idCategory
      this.dataModal.author = data.author
    },
    clearModal () {
      this.dataModal.id = null
      this.dataModal.title = ''
      this.dataModal.description = ''
      this.dataModal.image = null
      this.dataModal.idCategori = 0
      this.dataModal.author = ''
      this.modalActive = false
    },
    addProdcut () {
      const data = new FormData()
      data.append('title', this.dataModal.title)
      data.append('description', this.dataModal.description)
      data.append('image', this.dataModal.image)
      data.append('idCategory', this.dataModal.idCategori)
      data.append('author', this.dataModal.author)
      //   perbandingan
      //   const data = {
      //     title: this.dataModal.title,
      //     description: this.dataModal.description,
      //     image: this.dataModal.image,
      //     idCategory: this.dataModal.idCategori,
      //     author: this.dataModal.author
      //   }
      this.insertProduct(data)
        .then(res => {
          this.clearModal()
          this.getProduct()
          alert('insert berhasil')
        })
    }
  },
  computed: {
    ...mapGetters({
      productstate: 'getProduct',
      pagination: 'getPage',
      countCart: 'countCart',
      getCart: 'getCart'
    })
  },
  mounted () {
    this.getProduct()
    console.log('hello ini tes')
  }
}
</script>

<style scoped>

</style>
