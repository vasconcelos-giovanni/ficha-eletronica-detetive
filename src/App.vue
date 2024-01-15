<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="p-3 d-flex flex-column align-items-center">
    <div class="centralizer-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<style>
.centralizer-wrapper {
  max-width: 720px;
}
</style>
