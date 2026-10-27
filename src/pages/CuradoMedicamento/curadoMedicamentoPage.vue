<template>
  <q-page class="q-pa-md">
    <q-table
      title="Alimentos y Medicamentos"
      :rows="curadoMedicamentoStore.curadoMedicamentos"
      :columns="columns"
      row-key="id"
      :loading="curadoMedicamentoStore.loading"
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
          :loading="curadoMedicamentoStore.loading"
          @click="curadoMedicamentoStore.fetchAll()"
        />
      </template>
    </q-table>

    <q-banner v-if="curadoMedicamentoStore.error" class="bg-negative text-white q-mt-md" rounded>
      {{ curadoMedicamentoStore.error }}
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { QTableColumn } from 'quasar';
import { useCuradoMedicamentoStore } from 'stores/curadoMedicamento';
import type { CuradoMedicamentoResponseDto } from 'src/models/CuradoMedicamento/CuradoMedicamentoResponseDto';

const curadoMedicamentoStore = useCuradoMedicamentoStore();

const columns: QTableColumn<CuradoMedicamentoResponseDto>[] = [
  { name: 'id', label: 'Id', field: 'id', align: 'left', sortable: true },
  {
    name: 'medicamento',
    label: 'Medicamento',
    field: 'medicamento',
    align: 'left',
    sortable: true,
  },
  { name: 'alimento', label: 'Alimento', field: 'alimento', align: 'left', sortable: true },
  {
    name: 'fechaVisita',
    label: 'Fecha de Visita',
    field: 'fechaVisita',
    align: 'left',
    sortable: true,
  },
];

onMounted(() => {
  void curadoMedicamentoStore.fetchAll();
});
</script>
