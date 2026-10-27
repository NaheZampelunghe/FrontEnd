import { defineStore } from 'pinia';
import { ref } from 'vue';
import { isAxiosError } from 'axios';
import { api } from 'boot/axios';
import type { LocalidadResponseDto } from 'src/models/Localidad/LocalidadResponseDto';

export const useLocalidadStore = defineStore('localidad', () => {
  const localidades = ref<LocalidadResponseDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /** GET api/Localidad/All */
  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<LocalidadResponseDto[]>('/Localidades/All');
      localidades.value = data;
    } catch (e) {
      localidades.value = [];
      if (isAxiosError(e)) {
        error.value = e.response
          ? `Error ${e.response.status} al obtener los autores`
          : 'No se pudo conectar con la API';
      } else {
        error.value = 'Error inesperado al obtener los autores';
      }
    } finally {
      loading.value = false;
    }
  }

  return { localidades, loading, error, fetchAll };
});
