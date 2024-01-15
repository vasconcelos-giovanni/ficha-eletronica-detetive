<script setup>
import { RouterLink } from 'vue-router';
import Cookies from 'js-cookie';

function clearCurrentBoardCookie() {
  Cookies.remove('currentBoardVersion');
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link
        :to="{ name: 'home' }"
        class="navbar-brand text-decoration-none fw-bold"
        @click="clearCurrentBoardCookie()"
      >
        DETETIVE
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link
            :to="{ name: 'home' }"
            class="nav-link active"
            aria-current="page"
            @click="clearCurrentBoardCookie()"
          >
            Início
          </router-link>
        </div>
        <div class="dropdown-wrapper">
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Versão do jogo
            </button>
            <ul class="dropdown-menu">
              <li>
                <router-link :to="{ name: 'versions.classic-6' }" class="dropdown-item"
                  >Clássico (6 personages)</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'versions.horror-edition' }" class="dropdown-item"
                  >Horror Edition</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.dropdown-wrapper {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
}

@media screen and (max-width: 720px) {
  .dropdown-wrapper {
    display: flex;
    justify-content: center;
  }
}
</style>
