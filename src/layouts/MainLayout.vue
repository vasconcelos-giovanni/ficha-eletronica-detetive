<script setup>
import { MainFooter } from '../components';
import { MainNavbar } from '../components';
</script>

<template>
  <MainNavbar />
  <slot />
  <MainFooter />
</template>
