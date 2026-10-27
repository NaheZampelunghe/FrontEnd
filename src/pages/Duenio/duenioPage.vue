<template>
  <q-page class="q-pa-md">
    <q-table
      title="Dueños"
      :rows="duenioStore.duenios"
      :columns="columns"
      row-key="id"
      :loading="duenioStore.loading"
      :rows-per-page-options="[10, 20, 50, 0]"
      no-data-label="No hay dueños para mostrar"
      loading-label="Cargando dueños..."
    >
      <template #top-right>
        <q-btn
          flat
          round
          icon="refresh"
          aria-label="Actualizar"
          :loading="duenioStore.loading"
          @click="duenioStore.fetchAll()"
        />
      </template>
    </q-table>

    <q-banner v-if="duenioStore.error" class="bg-negative text-white q-mt-md" rounded>
      {{ duenioStore.error }}
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { QTableColumn } from 'quasar';
import { useDuenioStore } from 'stores/duenio';
import type { DuenioResponseDto } from 'src/models/Duenio/DuenioResponseDto';

const duenioStore = useDuenioStore();

const columns: QTableColumn<DuenioResponseDto>[] = [
  { name: 'id', label: 'Id', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
  { name: 'apellido', label: 'Apellido', field: 'apellido', align: 'left', sortable: true },
  { name: 'renapa', label: 'RENAPA', field: 'renapa', align: 'left', sortable: true },
  { name: 'localidad', label: 'Localidad', field: 'localidad', align: 'left', sortable: true },
];

onMounted(() => {
  void duenioStore.fetchAll();
});
</script>
