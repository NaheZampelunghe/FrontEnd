<template>
  <q-card style="min-width: 420px">
    <q-card-section>
      <div class="text-h6">{{ editId ? 'Editar provincia' : 'Nuevo provincia' }}</div>
    </q-card-section>
    <q-separator />

    <q-card-section>
      <q-form ref="formRef" greedy @submit.prevent="onSubmit">
        <q-input
          v-model="form.nombre"
          label="Nombre"
          outlined
          class="q-mb-sm"
          :maxlength="30"
          counter
          lazy-rules
          :rules="[(v: string) => (!!v && v.trim().length > 0) || 'Ingresa el nombre']"
        />
      </q-form>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Cancelar" flat @click="$emit('close')" />
      <q-btn
        :label="editId ? 'Guardar' : 'Crear'"
        color="primary"
        :loading="provinciaStore.loading"
        @click="onSubmit"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { QForm } from 'quasar';
import { useProvinciaStore } from 'stores/provincia';
import type { ProvinciaRequestDto } from 'src/models/Provincia/ProvinciaRequestDto';
import { notificarError } from 'src/utils/notificar';

// editId null = alta; con numero = modificacion
const props = defineProps<{ editId: number | null }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const provinciaStore = useProvinciaStore();
const formRef = ref<QForm | null>(null);

// El formulario completa el mismo DTO que viaja a la API
const form = ref<ProvinciaRequestDto>({
  id: 0,
  nombre: '',
});

// Si es modificacion, se traen los datos actuales del provincia
onMounted(async () => {
  if (props.editId) {
    const provincia = await provinciaStore.fetchById(props.editId);
    if (provincia) {
      form.value = {
        id: provincia.id,
        nombre: provincia.nombre,
      };
    }
  }
});

async function onSubmit() {
  const valido = await formRef.value?.validate();
  if (!valido) {
    return;
  }
  try {
    if (props.editId) {
      await provinciaStore.update(props.editId, form.value);
    } else {
      await provinciaStore.create(form.value);
    }
    emit('close');
  } catch {
    notificarError('No se pudo guardar la provincia');
  }
}
</script>
