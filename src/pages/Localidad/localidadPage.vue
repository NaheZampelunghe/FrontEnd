<template>
  <q-page class="q-pa-md">
    <q-table
      title="Dueños"
      :rows="localidadStore.localidades"
      :columns="columns"
      row-key="id"
      :loading="localidadStore.loading"
      :rows-per-page-options="[10, 20, 50, 0]"
      no-data-label="No hay localidades para mostrar"
      loading-label="Cargando localidades..."
    >
      <template #top-right>
        <q-btn
          flat
          round
          icon="refresh"
          aria-label="Actualizar"
          :loading="localidadStore.loading"
          @click="localidadStore.fetchAll()"
        />
      </template>
    </q-table>

    <q-banner v-if="localidadStore.error" class="bg-negative text-white q-mt-md" rounded>
      {{ localidadStore.error }}
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { QTableColumn } from 'quasar';
import { useLocalidadStore } from 'stores/localidad';
import type { LocalidadResponseDto } from 'src/models/Localidad/LocalidadResponseDto';

const localidadStore = useLocalidadStore();

const columns: QTableColumn<LocalidadResponseDto>[] = [
  { name: 'id', label: 'Id', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
  { name: 'ciudad', label: 'Ciudad', field: 'ciudad', align: 'left', sortable: true },
];

onMounted(() => {
  void localidadStore.fetchAll();
});
</script>
