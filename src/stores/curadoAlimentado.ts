import { defineStore } from 'pinia';
import { ref } from 'vue';
import { isAxiosError } from 'axios';
import { api } from 'boot/axios';
import type { CuradoAlimentadoResponseDto } from 'src/models/CuradoAlimentado/CuradoAlimentadoResponseDto';

export const useCuradoAlimentadoStore = defineStore('curadoAlimentado', () => {
  const curadoAlimentados = ref<CuradoAlimentadoResponseDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /** GET api/CuradoAlimentado/All */
  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<CuradoAlimentadoResponseDto[]>('/CuradosAlimentados/All');
      curadoAlimentados.value = data;
    } catch (e) {
      curadoAlimentados.value = [];
      if (isAxiosError(e)) {
        error.value = e.response
          ? `Error ${e.response.status} al obtener las Curas y Alimentadas`
          : 'No se pudo conectar con la API';
      } else {
        error.value = 'Error inesperado al obtener las Curas y Alimentadas';
      }
    } finally {
      loading.value = false;
    }
  }

  return { curadoAlimentados, loading, error, fetchAll };
});
