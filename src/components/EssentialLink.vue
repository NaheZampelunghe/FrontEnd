<template>
  <q-item
    clickable
    :tag="isExternal ? 'a' : undefined"
    :href="isExternal ? link : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    :to="isExternal ? undefined : link"
  >
    <q-item-section v-if="icons.length" avatar style="min-width: 56px; width: 56px">
      <div class="row no-wrap items-center justify-center full-width" style="gap: 2px">
        <q-icon v-for="(name, index) in icons" :key="index" :name="name" :size="iconSize" />
      </div>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  icon2?: string;
  icon3?: string;
}

const props = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
  icon2: '',
  icon3: '',
});

const isExternal = computed(() => /^(https?:)?\/\/|^mailto:|^tel:/.test(props.link));

// Solo los iconos que tengan valor, en orden
const icons = computed(() => [props.icon, props.icon2, props.icon3].filter(Boolean));

// Más iconos = más chicos, para que entren en la columna del avatar
const iconSize = computed(() => {
  if (icons.value.length >= 3) return '16px';
  if (icons.value.length === 2) return '24px';
  return '24px';
});
</script>
