<template>
  <q-page class="q-pa-md">
    <q-table
      title="Colmenas"
      :rows="colmenaStore.colmenas"
      :columns="columns"
      row-key="id"
      :loading="colmenaStore.loading"
      :rows-per-page-options="[10, 20, 50, 0]"
      no-data-label="No hay colmenas para mostrar"
      loading-label="Cargando colmenas..."
    >
      <template #top-right>
        <q-btn
          flat
          round
          icon="refresh"
          aria-label="Actualizar"
          :loading="colmenaStore.loading"
          @click="colmenaStore.fetchAll()"
        />
      </template>
    </q-table>

    <q-banner v-if="colmenaStore.error" class="bg-negative text-white q-mt-md" rounded>
      {{ colmenaStore.error }}
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { QTableColumn } from 'quasar';
import { useColmenaStore } from 'stores/colmena';
import type { ColmenaResponseDto } from 'src/models/Colmena/ColmenaResponseDto';

const colmenaStore = useColmenaStore();

const columns: QTableColumn<ColmenaResponseDto>[] = [
  { name: 'id', label: 'Id', field: 'id', align: 'left', sortable: true },
  { name: 'colmenar', label: 'Colmenar', field: 'colmenar', align: 'left', sortable: true },
  { name: 'duenio', label: 'Dueño', field: 'duenio', align: 'left', sortable: true },
  { name: 'viva', label: 'Viva', field: 'viva', align: 'left', sortable: true },
];

onMounted(() => {
  void colmenaStore.fetchAll();
});
</script>
