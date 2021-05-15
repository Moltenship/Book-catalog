<template>
  <div>
    <el-select v-model='selectValue' placeholder='Select grouping criteria'>
      <el-option
        v-for='item in options'
        :key='item.value'
        :label='item.label'
        :value='item.value'></el-option>
    </el-select>
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
      selectValue: 'rating',
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
      ) ].sort((a, b) => b - a)
    },
  },
  methods: {
    ...mapActions([ 'getBooks' ]),
    groupBooks(group) {
      return this.books.filter(
        (book) => {
          if (this.selectValue in book)
            return book[this.selectValue] === group
        })
    },
  },
  async created() {
    await this.getBooks()
  },
}
</script>

<style>

</style>