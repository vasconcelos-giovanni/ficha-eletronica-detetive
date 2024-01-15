<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import Cookies from 'js-cookie';

const props = defineProps({
  boardVersion: {
    required: true,
    type: String,
  },
  categoria: {
    required: true,
    type: String,
  },
  conteudo: {
    required: true,
    type: Array,
  },
  idCategoria: {
    required: true,
    type: Number,
  },
  routeName: {
    required: true,
    type: String,
  },
});

const idsPrefixes = {
  select: props.boardVersion + '_select_' + props.categoria,
  checkbox: props.boardVersion + '_checkbox_' + props.categoria,
  input: props.boardVersion + '_input_' + props.categoria,
};

const selectedOption = ref('?');
if (Cookies.get(idsPrefixes.select) == undefined) {
  Cookies.set(idsPrefixes.select, selectedOption.value, { expires: 1 });
} else {
  selectedOption.value = Cookies.get(idsPrefixes.select);
}

watch(selectedOption, () => {
  // Select
  Cookies.set(idsPrefixes.select, selectedOption.value, { expires: 1 });
});

const checkboxes = reactive({});
const inputs = reactive({});
onMounted(() => {
  /* -------------------------------------------------------------------------- */
  /*                               Cookies: START                               */
  /* -------------------------------------------------------------------------- */
  //Board Versions
  Cookies.set('currentBoardVersion', props.routeName, { expires: 1 });

  // Checkboxes
  props.conteudo.forEach(({ idItem }) => {
    const checkboxId = idsPrefixes.checkbox + idItem;
    checkboxes[checkboxId] = false; // Set initial value to false
    if (Cookies.get(checkboxId) == undefined) {
      Cookies.set(checkboxId, checkboxes[checkboxId], { expires: 1 });
    } else {
      checkboxes[checkboxId] = Cookies.get(checkboxId) == 'false' ? false : true;
    }
  });

  // Inputs
  props.conteudo.forEach(({ idItem }) => {
    const inputId = idsPrefixes.input + idItem;
    inputs[inputId] = ''; // Set initial value to false
    if (Cookies.get(inputId) == undefined) {
      Cookies.set(inputId, inputs[inputId], { expires: 1 });
    } else {
      inputs[inputId] = Cookies.get(inputId);
    }
  });

  watch(
    checkboxes,
    (newCheckboxes) => {
      for (const checkbox in newCheckboxes) {
        Cookies.set(checkbox, newCheckboxes[checkbox], { expires: 1 });
      }
    },
    { deep: true },
  );

  watch(
    inputs,
    (newInputs) => {
      for (const input in newInputs) {
        Cookies.set(input, newInputs[input], { expires: 1 });
      }
    },
    { deep: true },
  );
  /* -------------------------------------------------------------------------- */
  /*                                Cookies: END                                */
  /* -------------------------------------------------------------------------- */
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
      class="form-select mb-3 fw-bold btn btn-success"
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
