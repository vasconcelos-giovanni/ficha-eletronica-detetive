<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  coverName: {
    required: true,
    type: String,
  },
  routeName: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
});

const BOARDS_COVERS_PATH_PREFIX = '../../public/img/boards/';
</script>

<template>
  <div class="card">
    <img
      :src="`${BOARDS_COVERS_PATH_PREFIX}${props.coverName}`"
      class="card-img-top board-cover"
      :alt="`Versão ${props.title}`"
    />
    <div class="card-body">
      <h5 class="card-title">{{ props.title }}</h5>
      <router-link :to="{ name: props.routeName }" class="btn btn-primary">Abrir</router-link>
    </div>
  </div>
</template>

<style scoped>
.board-cover {
  max-height: 11.36rem;
  max-width: 18rem;
  object-fit: cover;
  overflow: hidden;
}

.card {
  width: 18rem;
}
</style>
