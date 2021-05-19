<template>
  <div class='book'>
    <div class='book__name'>{{book.name}}</div>
    <div class='book__authors'>{{book.authors.join(' ')}}</div>
    <div class='book__rating' v-if='book?.rating'>Rating: {{book.rating}}</div>
    <div class='book__isbn' v-if='book?.ISBN'>ISBN: {{book.ISBN}}</div>
    <div v-if='isLoggedIn' class='book__buttons'>
      <el-button @click='handleDelete(book)' type='danger' class='book__delete-button'>Delete book</el-button>
      <el-button @click='isEditOpen = true' type='primary' class='book__edit-button'>Edit book</el-button>
      <el-dialog v-model='isEditOpen' title='Edit book'>
        <span>{{book.name}}</span>
        <el-button @click='isEditOpen = false'>Cancel</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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