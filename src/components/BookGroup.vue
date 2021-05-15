<template>
  <div class='group'>
    <el-collapse>
      <el-collapse-item
        name='1'
        :title='formattedTitle'>
        <div class='book' v-for='book in sortedBooks' :key='book.id'>
          <div class='book__name'>{{book.name}}</div>
          <div class='book__authors'>{{book.authors.join(' ')}}</div>
          <div class='book__rating' v-if='book?.rating'>Rating: {{book.rating}}</div>
          <div class='book__isbn' v-if='book?.ISBN'>ISBN: {{book.ISBN}}</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
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
    ...mapGetters([ 'books' ]),
    formattedTitle() {
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
.book {
  border-bottom: 1px solid #EBEEF5;
  border-top: 1px solid #EBEEF5;

  &__name {
    font-weight: bold;
  }
}

</style>