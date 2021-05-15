<template>
  <div class='layout'>
    <app-header/>
    <app-content></app-content>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppContent from './AppContent.vue'
export default {
  components: {
    AppHeader, AppContent,
  },
}
</script>

<style>
.layout {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
}
</style>