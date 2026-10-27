import { defineStore } from 'pinia';
import { ref } from 'vue';
import { isAxiosError } from 'axios';
import { api } from 'boot/axios';
import type { UbicacionResponseDto } from 'src/models/Ubicacion/UbicacionResponseDto';

export const useUbicacionStore = defineStore('ubicacion', () => {
  const ubicaciones = ref<UbicacionResponseDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /** GET api/Ubicacion/All */
  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<UbicacionResponseDto[]>('/Ubicaciones/All');
      ubicaciones.value = data;
    } catch (e) {
      ubicaciones.value = [];
      if (isAxiosError(e)) {
        error.value = e.response
          ? `Error ${e.response.status} al obtener los ubicaciones`
          : 'No se pudo conectar con la API';
      } else {
        error.value = 'Error inesperado al obtener los ubicaciones';
      }
    } finally {
      loading.value = false;
    }
  }

  return { ubicaciones, loading, error, fetchAll };
});
