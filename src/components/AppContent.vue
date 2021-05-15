<template>
  <div class='container'>
    <div class='inputs'>
      <el-select class='inputs__select' v-model='selectValue' placeholder='Select grouping criteria'>
        <el-option
          v-for='item in options'
          :key='item.value'
          :label='item.label'
          :value='item.value'></el-option>
      </el-select>
      <el-button type='primary' class='inputs__button'>Add new book</el-button>
    </div>
    <div>
      <book-group
        v-for='group in groupItems'
        :key='group'
        :group='group'
        :groupedBooks='groupBooks(group)'></book-group>
    </div>
  </div>
</template>

<script>
import BookGroup from './BookGroup.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BookGroup,
  },
  data() {
    return {
      selectValue: 'publication_year',
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
    ...mapGetters([ 'books' ]),
    groupItems() {
      return [ ...new Set(this.books.map(
        (book) => {
          if (this.selectValue in book) {
            return book[this.selectValue]
          }
        }),
      ) ].sort().reverse().filter(book => book).flat()
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
  async created() {
    await this.getBooks()
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
  .inputs {
    display: flex;
    gap: 16px;
    &__select {
      width: 80%;
    }
    &__button {
      flex: 1;
    }
  }
}
</style>