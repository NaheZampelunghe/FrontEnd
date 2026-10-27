import { defineStore } from 'pinia';
import { ref } from 'vue';
import { isAxiosError } from 'axios';
import { api } from 'boot/axios';
import type { ColmenaResponseDto } from 'src/models/Colmena/ColmenaResponseDto';

export const useColmenaStore = defineStore('colmena', () => {
  const colmenas = ref<ColmenaResponseDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /** GET api/Colmena/All */
  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<ColmenaResponseDto[]>('/Colmenas/All');
      colmenas.value = data;
    } catch (e) {
      colmenas.value = [];
      if (isAxiosError(e)) {
        error.value = e.response
          ? `Error ${e.response.status} al obtener las colmenas`
          : 'No se pudo conectar con la API';
      } else {
        error.value = 'Error inesperado al obtener las colmenas';
      }
    } finally {
      loading.value = false;
    }
  }

  return { colmenas, loading, error, fetchAll };
});
