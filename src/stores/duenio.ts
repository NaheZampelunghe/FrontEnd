import { defineStore } from 'pinia';
import { ref } from 'vue';
import { isAxiosError } from 'axios';
import { api } from 'boot/axios';
import type { DuenioResponseDto } from 'src/models/Duenio/DuenioResponseDto';

export const useDuenioStore = defineStore('duenio', () => {
  const duenios = ref<DuenioResponseDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /** GET api/Dueño/All */
  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<DuenioResponseDto[]>('/Duenios/All');
      duenios.value = data;
    } catch (e) {
      duenios.value = [];
      if (isAxiosError(e)) {
        error.value = e.response
          ? `Error ${e.response.status} al obtener las dueños`
          : 'No se pudo conectar con la API';
      } else {
        error.value = 'Error inesperado al obtener las duenños';
      }
    } finally {
      loading.value = false;
    }
  }

  return { duenios, loading, error, fetchAll };
});
