<template>
  <div class='group'>
    <el-collapse>
      <el-collapse-item
        name='1'
        :title='formattedTitle'>
        <div v-for='book in sortedBooks' :key='book.id'>
          <book-item :book='book' />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import BookItem from './BookItem.vue'

export default {
  components: {
    BookItem,
  },
  props: {
    group: {
      required: true,
    },
    groupedBooks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formattedTitle() {
      debugger
      return Array.isArray(this.group) ? this.group.join('; ') : this.group.toString()
    },
    sortedBooks() {
      return [ ...this.groupedBooks ].sort((a,b) => a.name.localeCompare(b.name))
    },
  },

}
</script>

<style lang="scss" scoped>
.group {
  padding: 0 4px 0 16px;
}
</style>