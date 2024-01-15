<script setup>
import { MainLayout } from '../layouts';
import { BoardVersionCard } from '../components';
import classicSixDatabase from '../assets/databases/classicSixCharacters.json';
import horrorDatabase from '../assets/databases/horrorEdition.json';
import Cookies from 'js-cookie';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

onMounted(() => {
  if (Cookies.get('currentBoardVersion') != undefined) {
    const currentBoardVersion = Cookies.get('currentBoardVersion');
    const router = useRouter();
    router.replace({ name: currentBoardVersion });
  }
});
</script>

<template>
  <MainLayout>
    <div class="d-flex flex-column align-items-center gap-3">
      <BoardVersionCard
        :coverName="classicSixDatabase.coverName"
        :routeName="classicSixDatabase.routeName"
        :title="classicSixDatabase.versionTitle"
      />
      <BoardVersionCard
        :coverName="horrorDatabase.coverName"
        :routeName="horrorDatabase.routeName"
        :title="horrorDatabase.versionTitle"
      />
    </div>
  </MainLayout>
</template>
