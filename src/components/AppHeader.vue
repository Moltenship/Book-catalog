<template>
  <el-header class='header' height='64px'>
    <div class='header__logo'>Book catalog 📚</div>
    <template v-if='isLoggedIn'>
      <a href='#' class='header__user user' @click='handleSignOut'>
        <div class='user__name'>
          {{user.displayName}}
        </div>
        <img :src='user.photoURL' class='user__image'>
      </a>
    </template>
    <el-button
      v-else
      type='primary'
      class='header__button'
      @click='handleSignIn'>Sign In</el-button>
  </el-header>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters([ 'user', 'isLoggedIn' ]),
  },
  methods: {
    ...mapActions([ 'signIn', 'signOut' ]),
    ...mapMutations([ 'SET_AUTH_STATUS' ]),
    async handleSignIn() {
      if (this.user) {
        this.SET_AUTH_STATUS()
      } else {
        await this.signIn()
      }
    },
    async handleSignOut() {
      await this.signOut()
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
    color: inherit;
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
