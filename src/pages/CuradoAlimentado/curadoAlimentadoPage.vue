<template>
  <q-page class="q-pa-md">
    <q-table
      title="Curado ó Alimentado"
      :rows="curadoAlimentadoStore.curadoAlimentados"
      :columns="columns"
      row-key="id"
      :loading="curadoAlimentadoStore.loading"
      :rows-per-page-options="[10, 20, 50, 0]"
      no-data-label="No hay curas y alimentadas para mostrar"
      loading-label="Cargando..."
    >
      <template #top-right>
        <q-btn
          flat
          round
          icon="refresh"
          aria-label="Actualizar"
          :loading="curadoAlimentadoStore.loading"
          @click="curadoAlimentadoStore.fetchAll()"
        />
      </template>
    </q-table>

    <q-banner v-if="curadoAlimentadoStore.error" class="bg-negative text-white q-mt-md" rounded>
      {{ curadoAlimentadoStore.error }}
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { QTableColumn } from 'quasar';
import { useCuradoAlimentadoStore } from 'stores/curadoAlimentado';
import type { CuradoAlimentadoResponseDto } from 'src/models/CuradoAlimentado/CuradoAlimentadoResponseDto';

const curadoAlimentadoStore = useCuradoAlimentadoStore();

const columns: QTableColumn<CuradoAlimentadoResponseDto>[] = [
  { name: 'id', label: 'Id', field: 'id', align: 'left', sortable: true },
  { name: 'curado', label: 'Curado', field: 'curado', align: 'left', sortable: true },
  { name: 'alimentado', label: 'Alimentado', field: 'alimentado', align: 'left', sortable: true },
  {
    name: 'fechaVisita',
    label: 'Fecha de Visita',
    field: 'fechaVisita',
    align: 'left',
    sortable: true,
  },
  {
    name: 'cantidadMuertas',
    label: 'Cantidad de Muertas',
    field: 'cantidadMuertas',
    align: 'left',
    sortable: true,
  },
];

onMounted(() => {
  void curadoAlimentadoStore.fetchAll();
});
</script>
