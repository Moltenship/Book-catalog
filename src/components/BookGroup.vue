<template>
  <div class='group'>
    <el-collapse>
      <el-collapse-item
        name='1'
        :title='formattedTitle'>
        <div v-for='book in groupedBooks' :key='book.id'>{{book}}</div>
      </el-collapse-item>
      <!-- <el-collapse-item title='Feedback' name='2'>
        <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
        <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
      </el-collapse-item>
      <el-collapse-item title='Efficiency' name='3'>
        <div>Simplify the process: keep operating process simple and intuitive;</div>
        <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
        <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
      </el-collapse-item>
      <el-collapse-item title='Controllability' name='4'>
        <div>Decision making: giving advices about operations is acceptable, but do not make decisions for the users;</div>
        <div>Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.</div>
      </el-collapse-item> -->
    </el-collapse>
  </div>
</template>

<script>
import {  mapGetters } from 'vuex'


export default {
  props: {
    group: {
    },
    groupedBooks: {
    },
  },
  computed: {
    ...mapGetters([ 'books' ]),
    formattedTitle() {
      return typeof this.group === 'object' ? this.group.join('; ') : this.group?.toString()
    },
  },
}
</script>

<style>

</style>