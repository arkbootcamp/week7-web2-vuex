<template>
    <div>
        <div class="container-flui">
            <div class="row">
                <div class="col-md-1">
                    <button class="btn btn-primary" @click="toggleModal">
                        add Data
                    </button>
                </div>
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-4" v-for="product in productstate" :key="product.id">
                            <Card :item="product" @event-update="setUpdate" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <p>keranjang</p>
                </div>
            </div>
        </div>
        <Modal v-show="modalActive" :data="dataModal" @close-modal="toggleModal" @fire-event="handleEventModal"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '../../../components/Card'
import Modal from '../../../components/Modal'

export default {
  name: 'Product',
  components: {
    Card,
    Modal
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
    ...mapActions(['getProduct', 'insertProduct', 'editProduct']),
    toggleModal () {
      this.modalActive = !this.modalActive
      if (!this.modalActive) {
        this.clearModal()
      }
    },
    handleEventModal () {
      this.dataModal.id ? this.updateProduct() : this.addProdcut()
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
      productstate: 'getProduct'
    })
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style scoped>

</style>
