<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import Cookies from 'js-cookie';

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

const idsPrefixes = {
  select: 'select_' + props.categoria,
  checkbox: 'checkbox_' + props.categoria,
  input: 'input_' + props.categoria,
};

const selectedOption = ref('?');
// Cookies.set(idsPrefixes.select, selectedOption.value);
if (Cookies.get(idsPrefixes.select) == undefined) {
  Cookies.set(idsPrefixes.select, selectedOption.value);
} else {
  selectedOption.value = Cookies.get(idsPrefixes.select);
}

watch(selectedOption, () => {
  // Select
  Cookies.set(idsPrefixes.select, selectedOption.value);
});

const checkboxes = reactive({});
const inputs = reactive({});
onMounted(() => {
  // Checkboxes
  props.conteudo.forEach(({ idItem }) => {
    const checkboxId = idsPrefixes.checkbox + idItem;
    checkboxes[checkboxId] = false; // Set initial value to false
    if (Cookies.get(checkboxId) == undefined) {
      Cookies.set(checkboxId, checkboxes[checkboxId]);
    } else {
      checkboxes[checkboxId] = Cookies.get(checkboxId) == 'false' ? false : true;
    }
  });

  // Inputs
  props.conteudo.forEach(({ idItem }) => {
    const inputId = idsPrefixes.input + idItem;
    inputs[inputId] = ''; // Set initial value to false
    if (Cookies.get(inputId) == undefined) {
      Cookies.set(inputId, inputs[inputId]);
    } else {
      inputs[inputId] = Cookies.get(inputId);
    }
  });

  watch(
    checkboxes,
    (newCheckboxes) => {
      for (const checkbox in newCheckboxes) {
        Cookies.set(checkbox, newCheckboxes[checkbox]);
      }
    },
    { deep: true },
  );

  watch(
    inputs,
    (newInputs) => {
      for (const input in newInputs) {
        Cookies.set(input, newInputs[input]);
      }
    },
    { deep: true },
  );
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const finalGuessMade = (id) => {
  return id != selectedOption.value && selectedOption.value != '?' ? true : false;
};
</script>

<template>
  <section class="col-12">
    <h3 class="fs-2">{{ capitalizeFirstLetter(props.categoria) }}</h3>

    <label class="form-check-label" :for="idsPrefixes.select"> Palpite final </label>
    <select
      class="form-select mb-3 fw-bold btn btn-primary"
      v-model="selectedOption"
      :id="'select_' + props.categoria"
    >
      <option value="?" selected>?</option>
      <option v-for="{ idItem, item } in conteudo" :key="idItem" :value="idItem">
        {{ item }}
      </option>
    </select>
    <div>
      <div class="mb-3" v-for="{ idItem, item } in conteudo" :key="idItem">
        <input
          class="form-check-input"
          type="checkbox"
          :id="idsPrefixes.checkbox + idItem"
          v-model="checkboxes[`${idsPrefixes.checkbox}${idItem}`]"
        />
        <label class="form-check-label fw-bold ms-1" :for="idsPrefixes.checkbox + idItem">
          <span class="text-danger" v-if="finalGuessMade(idItem)">{{ item }}</span>
          <span v-else>{{ item }}</span>
        </label>
        <div class="d-flex justify-content-end">
          <input
            type="text"
            class="form-control ms-3"
            placeholder="Comentário"
            v-model="inputs[`${idsPrefixes.input}${idItem}`]"
            :id="idsPrefixes.input + idItem"
          />
        </div>
      </div>
    </div>
  </section>
</template>
