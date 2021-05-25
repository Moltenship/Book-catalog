<template>
  <div class='book'>
    <div class='book__name'>{{book.name}}</div>
    <div class='book__authors'>{{book.authors.join(' ')}}</div>
    <div class='book__rating' v-if='book?.rating'>Rating: {{book.rating}}</div>
    <div class='book__isbn' v-if='book?.ISBN'>ISBN: {{book.ISBN}}</div>
    <template v-if='isLoggedIn'>
      <div class='book__buttons'>
        <el-button
          @click='handleDelete'
          type='danger'
          class='book__delete-button'>Delete book</el-button>
        <el-button @click='isEditOpen = true' type='primary' class='book__edit-button'>Edit book</el-button>
        <el-dialog v-model='isEditOpen' title='Edit book'>
          <book-form @submit-form='isEditOpen = false' :book-data='book'></book-form>
          <el-button @click='isEditOpen = false'>Cancel</el-button>
        </el-dialog>
      </div>
    </template>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BookForm from './BookForm.vue'

export default {
  components: {
    BookForm,
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters([ 'isLoggedIn' ]),
  },
  data() {
    return {
      isEditOpen: false,
    }
  },
  methods: {
    ...mapActions([ 'deleteBook' ]),
    async handleDelete() {
      console.log(this.book.id)
      console.log(this.book.name)
      this.deleteBook(this.book.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.book {
  border-bottom: 1px solid #EBEEF5;
  border-top: 1px solid #EBEEF5;
  &__name {
    font-weight: bold;
  }
  &__buttons {
    margin-bottom: 10px;
  }
}

</style>