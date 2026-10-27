import { defineStore } from 'pinia';
import { ref } from 'vue';
import { isAxiosError } from 'axios';
import { api } from 'boot/axios';
import type { ColmenarResponseDto } from 'src/models/Colmenar/ColmenarResponseDto';

export const useColmenarStore = defineStore('colmenar', () => {
  const colmenares = ref<ColmenarResponseDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /** GET api/Categoria/All */
  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<ColmenarResponseDto[]>('/Colmenares/All');
      colmenares.value = data;
    } catch (e) {
      colmenares.value = [];
      if (isAxiosError(e)) {
        error.value = e.response
          ? `Error ${e.response.status} al obtener los colmenares`
          : 'No se pudo conectar con la API';
      } else {
        error.value = 'Error inesperado al obtener los colmenares';
      }
    } finally {
      loading.value = false;
    }
  }

  return { colmenares, loading, error, fetchAll };
});
