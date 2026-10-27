import { defineStore } from 'pinia';
import { ref } from 'vue';
import { isAxiosError } from 'axios';
import { api } from 'boot/axios';
import type { CuradoMedicamentoResponseDto } from 'src/models/CuradoMedicamento/CuradoMedicamentoResponseDto';

export const useCuradoMedicamentoStore = defineStore('curadoMedicamento', () => {
  const curadoMedicamentos = ref<CuradoMedicamentoResponseDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /** GET api/CuradoMedicamento/All */
  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<CuradoMedicamentoResponseDto[]>('/CuradosMedicamentos/All');
      curadoMedicamentos.value = data;
    } catch (e) {
      curadoMedicamentos.value = [];
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

  return { curadoMedicamentos, loading, error, fetchAll };
});
