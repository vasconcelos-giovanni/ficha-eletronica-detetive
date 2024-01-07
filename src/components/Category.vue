<script setup>
import { ref } from 'vue';

const props = defineProps({
  idCategoria: {
    required: true,
    type: Number,
  },
  categoria: {
    required: true,
    type: String,
  },
  conteudo: {
    required: true,
    type: Array,
  },
});

const selectedOption = ref('?');

const finalGuessMade = (id) => {
  return id != selectedOption.value && selectedOption.value != '?' ? true : false;
};
</script>

<template>
  <section class="col-12">
    <h3 class="fs-2">{{ props.categoria }}</h3>

    <label class="form-check-label" for="characterSelect"> Palpite final </label>
    <select class="form-select mb-3 fw-bold btn btn-primary" v-model="selectedOption">
      <option value="?" selected>?</option>
      <option v-for="{ idItem, item } in conteudo" :key="idItem" :value="idItem">
        {{ item }}
      </option>
    </select>
    <div>
      <div class="mb-3" v-for="{ idItem, item } in conteudo" :key="idItem">
        <input class="form-check-input" type="checkbox" :id="idItem" />
        <label class="form-check-label fw-bold ms-1" :for="idItem">
          <span class="text-danger" v-if="finalGuessMade(idItem)">{{ item }}</span>
          <span v-else>{{ item }}</span>
        </label>
        <div class="d-flex justify-content-end">
          <input type="text" class="form-control ms-3" placeholder="Comentário" />
        </div>
      </div>
    </div>
  </section>
</template>
