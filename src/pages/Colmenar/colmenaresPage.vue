<template>
  <q-page class="q-pa-md">
    <q-table
      title="Colmenares"
      :rows="colmenarStore.colmenares"
      :columns="columns"
      row-key="id"
      :loading="colmenarStore.loading"
      :rows-per-page-options="[10, 20, 50, 0]"
      no-data-label="No hay colmenares para mostrar"
      loading-label="Cargando colmenares..."
    >
      <template #top-right>
        <q-btn
          flat
          round
          icon="refresh"
          aria-label="Actualizar"
          :loading="colmenarStore.loading"
          @click="colmenarStore.fetchAll()"
        />
      </template>
    </q-table>

    <q-banner v-if="colmenarStore.error" class="bg-negative text-white q-mt-md" rounded>
      {{ colmenarStore.error }}
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { QTableColumn } from 'quasar';
import { useColmenarStore } from 'stores/colmenar';
import type { ColmenarResponseDto } from 'src/models/Colmenar/ColmenarResponseDto';

const colmenarStore = useColmenarStore();

const columns: QTableColumn<ColmenarResponseDto>[] = [
  { name: 'id', label: 'Id', field: 'id', align: 'left', sortable: true },
  { name: 'ubicacion', label: 'ubicación', field: 'ubicacion', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
];

onMounted(() => {
  void colmenarStore.fetchAll();
});
</script>
