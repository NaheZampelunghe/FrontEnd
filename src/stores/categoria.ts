import { defineStore } from 'pinia';
import { ref } from 'vue';
import { isAxiosError } from 'axios';
import { api } from 'boot/axios';
import type { CategoriaResponseDto } from 'src/models/Categoria/CategoriaResponseDto';

export const useCategoriaStore = defineStore('categoria', () => {
  const categorias = ref<CategoriaResponseDto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  /** GET api/Categoria/All */
  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<CategoriaResponseDto[]>('/Categorias/All');
      categorias.value = data;
    } catch (e) {
      categorias.value = [];
      if (isAxiosError(e)) {
        error.value = e.response
          ? `Error ${e.response.status} al obtener las categorias`
          : 'No se pudo conectar con la API';
      } else {
        error.value = 'Error inesperado al obtener las categorias';
      }
    } finally {
      loading.value = false;
    }
  }

  return { categorias, loading, error, fetchAll };
});
