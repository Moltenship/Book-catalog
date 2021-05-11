<template>
  <el-header class='header' height='64px'>
    <div class='header__logo'>Book catalog 📚</div>
    <template v-if='user'>
      <div class='header__user user'>
        <div class='user__name'>
          {{user.displayName}}
        </div>
        <img :src='user.photoURL' class='user__image'>
      </div>
    </template>
    <el-button
      v-if='!user'
      type='primary'
      class='header__button'
      @click='handleClick'>Sign In</el-button>
  </el-header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([ 'user' ]),
  },
  methods: {
    ...mapActions([ 'signIn' ]),
    async handleClick() {
      await this.signIn()
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); // TODO: fix this to a better solution
  &__logo {
    font-size: 30px;
  }
  &__button {
    margin-left: auto;
  }
  &__user {
    margin-left: auto;
  }
}

.user {
  display: flex;
  align-items: center;
  gap: 8px;
  &__name {
    font-size: 18px;
  }
  &__image {
    border-radius: 50%;
    height: 32px;
    width: 32px;
  }
}

</style>
