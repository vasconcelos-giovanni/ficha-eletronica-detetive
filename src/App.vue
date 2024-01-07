<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import { Category } from './components';
import { ResetButton } from './components';
import database from './assets/database.json';
</script>

<template>
  <div class="p-3">
    <header>
      <h1 class="text-center mb-3 display-1">Detetive</h1>
      <h2 class="text-center mb-3 display-5">Ficha Eletrônica</h2>
    </header>

    <Category
      v-for="categoria in database.categorias"
      :key="categoria.idCategoria"
      :idCategoria="categoria.idCategoria"
      :categoria="categoria.categoria"
      :conteudo="categoria.conteudo"
    />

    <div class="mt-5">
      <ResetButton />
    </div>

    <hr class="my-3" />

    <footer class="mt-2 text-center">
      <p>
        Este site utiliza cookies somente para armazenar os dados do jogo, portanto, permita o uso
        de cookies para uma boa experiência.
      </p>
      <p>
        Desenvolvido por Giovanni Vasconcelos de Medeiros. Acesse meu site
        <a href="https://vasconcelos-giovanni.github.io/giovanni-vasconcelos">clicando aqui</a>.
      </p>
    </footer>
  </div>

  <!-- <RouterView /> -->
</template>
