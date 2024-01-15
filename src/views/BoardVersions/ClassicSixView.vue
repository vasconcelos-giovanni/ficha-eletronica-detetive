<script setup>
import { Category } from '../../components';
import { ResetButton } from '../../components';
import database from '../../assets/databases/classicSixCharacters.json';
import { MainLayout } from '../../layouts';
</script>

<template>
  <MainLayout>
    <div>
      <Category
        v-for="categoria in database.categorias"
        :key="categoria.idCategoria"
        :boardVersion="database.version"
        :categoria="categoria.categoria"
        :conteudo="categoria.conteudo"
        :idCategoria="categoria.idCategoria"
        :routeName="database.routeName"
      />

      <div class="mt-5">
        <ResetButton />
      </div>
    </div>
  </MainLayout>
</template>
