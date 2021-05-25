<template>
  <el-form :model='form' ref='form' :rules='rules' >
    <el-form-item label='Book name' prop='name'>
      <el-input v-model='form.name'></el-input>
    </el-form-item>
    <el-form-item label='Publication year' prop='publication_year'>
      <el-input v-model.number='form.publication_year'></el-input>
    </el-form-item>
    <el-form-item label='Rating' prop='rating'>
      <el-input v-model.number='form.rating'></el-input>
    </el-form-item>
    <el-form-item label='Authors' prop='authors'>
      <el-input v-model='form.authors'></el-input>
    </el-form-item>
    <el-form-item label='ISBN' prop='ISBN'>
      <el-input v-model='form.ISBN'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click='submitForm'>Submit</el-button>
      <el-button @click='resetForm'>Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { checkPublicationYear, checkRating, checkISBN } from '../utils/formValidators'
import { mapActions } from 'vuex'
export default {
  props: {
    bookData: {
      required: false,
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        name: '',
        publication_year: '',
        rating: '',
        ISBN: '',
        authors: '',
      },
      rules: {
        name: [
          { required: true, message: 'Please enter book name', trigger: 'blur' },
          { min: 1, max: 30, message: 'Length should be between 1 and 30 symbols', trigger: 'change' },
        ],
        publication_year: [
          { validator: checkPublicationYear, trigger: [ 'change', 'blur' ] },
        ],
        rating: [
          { validator: checkRating, trigger: [ 'change', 'blur' ] },
        ],
        authors: [
          { required: true, message: 'Please enter author name', trigger: 'blur' },
        ],
        ISBN: [
          { validator: checkISBN, trigger: [ 'change', 'blur' ] },
        ],
      },
    }
  },
  methods: {
    ...mapActions([ 'createBook', 'editBook' ]),
    resetForm() {
      this.$refs.form.resetFields()
    },
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.form?.rating) {
            delete this.form.rating
          }
          if (!this.form?.ISBN) {
            delete this.form.ISBN
          }
          if (!this.form?.publication_year) {
            delete this.form.publication_year
          }
          if (this.bookData) {
            await this.editBook(this.form)
          } else {
            await this.createBook(this.form)
          }
          this.$emit('submit-form')
        } else {
          return false
        }
      })
    },
  },
  mounted() {
    if (this.bookData) {
      this.form = { ...this.bookData }
      this.form.authors = this.form.authors.join(',')
    }
  },
}
</script>

<style>

</style>