<template>
  <q-page class="q-pa-md">
    <q-table
      title="Medicamentos"
      :rows="medicamentoStore.medicamentos"
      :columns="columns"
      row-key="id"
      :loading="medicamentoStore.loading"
      :rows-per-page-options="[10, 20, 50, 0]"
      no-data-label="No hay medicamentos para mostrar"
      loading-label="Cargando medicamentos..."
    >
      <template #top-right>
        <q-btn
          flat
          round
          icon="refresh"
          aria-label="Actualizar"
          :loading="medicamentoStore.loading"
          @click="medicamentoStore.fetchAll()"
        />
      </template>
    </q-table>

    <q-banner v-if="medicamentoStore.error" class="bg-negative text-white q-mt-md" rounded>
      {{ medicamentoStore.error }}
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { QTableColumn } from 'quasar';
import { useMedicamentoStore } from 'stores/medicamento';
import type { MedicamentoResponseDto } from 'src/models/Medicamento/MedicamentoResponseDto';

const medicamentoStore = useMedicamentoStore();

const columns: QTableColumn<MedicamentoResponseDto>[] = [
  { name: 'id', label: 'Id', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
];

onMounted(() => {
  void medicamentoStore.fetchAll();
});
</script>
