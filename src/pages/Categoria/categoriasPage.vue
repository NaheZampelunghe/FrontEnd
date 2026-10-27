<template>
  <q-page class="q-pa-md">
    <q-table
      title="Categorias"
      :rows="categoriaStore.categorias"
      :columns="columns"
      row-key="id"
      :loading="categoriaStore.loading"
      :rows-per-page-options="[10, 20, 50, 0]"
      no-data-label="No hay categorias para mostrar"
      loading-label="Cargando categorias..."
    >
      <template #top-right>
        <q-btn
          flat
          round
          icon="refresh"
          aria-label="Actualizar"
          :loading="categoriaStore.loading"
          @click="categoriaStore.fetchAll()"
        />
      </template>
    </q-table>

    <q-banner v-if="categoriaStore.error" class="bg-negative text-white q-mt-md" rounded>
      {{ categoriaStore.error }}
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { QTableColumn } from 'quasar';
import { useCategoriaStore } from 'stores/categoria';
import type { CategoriaResponseDto } from 'src/models/Categoria/CategoriaResponseDto';

const categoriaStore = useCategoriaStore();

const columns: QTableColumn<CategoriaResponseDto>[] = [
  { name: 'id', label: 'Id', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
  {
    name: 'descripcion',
    label: 'descripcion',
    field: 'descripcion',
    align: 'left',
    sortable: true,
  },
];

onMounted(() => {
  void categoriaStore.fetchAll();
});
</script>
