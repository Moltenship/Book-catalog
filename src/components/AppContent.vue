<template>
  <div class='container' v-if='books.length > 0'>
    <div class='inputs'>
      <el-select class='inputs__select' v-model='selectValue' placeholder='Select grouping criteria'>
        <el-option
          v-for='item in options'
          :key='item.value'
          :label='item.label'
          :value='item.value'></el-option>
      </el-select>
      <template v-if='isLoggedIn'>
        <el-button @click='isModalOpen = true' type='primary' class='inputs__button'>Add new book</el-button>
        <el-dialog v-model='isModalOpen' title='Create book' destroy-on-close>
          <book-form @submit-form='isModalOpen = false'></book-form>
          <el-button @click='isModalOpen = false'>Cancel</el-button>
        </el-dialog>
      </template>
    </div>
    <div>
      <div v-if='recommended' class='recommended-book'>
        <h2 class='recommended-book__heading'>Recommended book</h2>
        <div class='recommended-book__name'>{{recommended.name}}</div>
        <div class='recommended-book__author'>Author(s): {{recommended.authors.join(',')}}</div>
        <div class='recommended-book__year'>Publication year: {{recommended.publication_year}}</div>
        <div class='recommended-book__rating'>Rating: {{recommended.rating}}</div>
        <template v-if='recommended?.ISBN'>
          <div class='recommended-book__ISBN'>ISBN: {{recommended.ISBN}}</div>
        </template>
      </div>
      <template
        v-for='group in groupItems'
        :key='group'>
        <book-group
          :group='group'
          :groupedBooks='groupBooks(group)'></book-group>
      </template>
    </div>
  </div>
</template>

<script>
import BookGroup from './BookGroup.vue'
import BookForm from './BookForm.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BookGroup, BookForm,
  },
  data() {
    return {
      selectValue: 'publication_year',
      isModalOpen: false,
      options: [ {
        value: 'publication_year',
        label: 'Publication year',
      },
      {
        value: 'authors',
        label: 'Author',
      },
      {
        value: 'rating',
        label: 'Rating',
      } ],
    }
  },
  computed: {
    ...mapGetters([ 'books', 'isLoggedIn' ]),
    groupItems() {
      return [ ...new Set(this.books.map(
        (book) => {
          if (this.selectValue in book) {
            return book[this.selectValue]
          }
        }).sort().reverse().filter(book => book).flat()) ]
    },
    recommended() {
      const currentDate = new Date()
      const sortedArray = this.books.filter(book => currentDate.getFullYear() - book.publication_year <= 3).sort((a, b) => b.rating - a.rating)
      if (sortedArray.length === 0) {
        return
      }
      const maxValue = sortedArray[0].rating
      const suitableBooks = sortedArray.filter(book => book.rating === maxValue)
      return suitableBooks[Math.floor(Math.random() * suitableBooks.length)]
    },
  },
  methods: {
    ...mapActions([ 'getBooks' ]),
    groupBooks(group) {
      return this.books.filter(
        (book) => {
          if (this.selectValue in book) {
            if (Array.isArray(book[this.selectValue])) {
              return book[this.selectValue].includes(group)
            }
            return book[this.selectValue] === group
          }
        })
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.inputs {
  display: flex;
  gap: 16px;
  &__select {
    flex: 5;
  }
  &__button {
    flex: 1;
  }
}
.recommended-book {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
  &__heading {
    margin: 0;
  }
  &__name {
    font-weight: bolder;
  }
}
</style>