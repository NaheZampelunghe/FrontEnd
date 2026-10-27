<template>
  <q-page class="q-pa-md">
    <q-table
      title="Ubicaciones"
      :rows="ubicacionStore.ubicaciones"
      :columns="columns"
      row-key="id"
      :loading="ubicacionStore.loading"
      :rows-per-page-options="[10, 20, 50, 0]"
      no-data-label="No hay ubicaciones para mostrar"
      loading-label="Cargando ubicaciones..."
    >
      <template #top-right>
        <q-btn
          flat
          round
          icon="refresh"
          aria-label="Actualizar"
          :loading="ubicacionStore.loading"
          @click="ubicacionStore.fetchAll()"
        />
      </template>
    </q-table>

    <q-banner v-if="ubicacionStore.error" class="bg-negative text-white q-mt-md" rounded>
      {{ ubicacionStore.error }}
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { QTableColumn } from 'quasar';
import { useUbicacionStore } from 'stores/ubicacion';
import type { UbicacionResponseDto } from 'src/models/Ubicacion/UbicacionResponseDto';

const ubicacionStore = useUbicacionStore();

const columns: QTableColumn<UbicacionResponseDto>[] = [
  { name: 'id', label: 'Id', field: 'id', align: 'left', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true },
  { name: 'localidad', label: 'Localidad', field: 'localidad', align: 'left', sortable: true },
];

onMounted(() => {
  void ubicacionStore.fetchAll();
});
</script>
