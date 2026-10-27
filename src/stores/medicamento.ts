import { defineStore } from 'pinia';
import { ref } from 'vue';
import { isAxiosError } from 'axios';
import { api } from 'boot/axios';
import type { MedicamentoResponseDto } from 'src/models/Medicamento/MedicamentoResponseDto';

export const useMedicamentoStore = defineStore('medicamento', () => {
  const medicamentos = ref<MedicamentoResponseDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /** GET api/Medicamento/All */
  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<MedicamentoResponseDto[]>('/Medicamentos/All');
      medicamentos.value = data;
    } catch (e) {
      medicamentos.value = [];
      if (isAxiosError(e)) {
        error.value = e.response
          ? `Error ${e.response.status} al obtener los medicamentos`
          : 'No se pudo conectar con la API';
      } else {
        error.value = 'Error inesperado al obtener los medicamentos';
      }
    } finally {
      loading.value = false;
    }
  }

  return { medicamentos, loading, error, fetchAll };
});
