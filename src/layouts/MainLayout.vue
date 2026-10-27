<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Apicola </q-toolbar-title>

        <!-- Con sesion: nombre de usuario y boton para salir. Sin sesion: boton para ingresar -->
        <template v-if="auth.isAuthenticated">
          <q-icon name="person" class="q-mr-xs" />
          <span class="q-mr-md">{{ auth.userName }}</span>
          <q-btn flat dense label="Salir" icon="logout" @click="onLogout" />
        </template>
        <q-btn v-else flat dense label="Ingresar" icon="login" to="/login" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useAuthStore } from 'stores/auth';

const auth = useAuthStore();
const router = useRouter();

async function onLogout() {
  auth.logout();
  await router.push('/login');
}

const linksList: EssentialLinkProps[] = [
  {
    title: 'Alimentos',
    caption: 'Listado de alimentos',
    icon: 'mdi-hexagon-multiple-outline',
    link: '/alimentos',
  },
  //{
  // title: 'Categorias',
  //caption: 'Listado de categorias',
  //icon: 'mdi-tag-multiple-outline',
  //link: '/categorias',
  //},
  {
    title: 'Ciudades',
    caption: 'Listado de ciudades',
    icon: 'mdi-city-variant-outline',
    link: '/ciudades',
  },
  {
    title: 'Colmenas',
    caption: 'Listado de colmenas',
    icon: 'mdi-archive-outline',
    link: '/colmenas',
  },
  {
    title: 'Colmenares',
    caption: 'Listado de colmenares',
    icon: 'mdi-beehive-outline',
    link: '/colmenares',
  },
  {
    title: 'Cura y Alimento',
    caption: 'Listado de cura y alimento',
    icon3: 'mdi-medication-outline',
    icon2: 'mdi-hexagon-multiple-outline',
    link: '/curado-alimentado',
  },
  {
    title: 'Dueños',
    caption: 'Listado de dueños',
    icon: 'mdi-account-outline',
    link: '/dueño',
  },
  {
    title: 'Medicamento y Alimento',
    caption: 'Listado de medicamento y alimento',
    icon3: 'mdi-medication-outline',
    icon2: 'mdi-hexagon-multiple-outline',
    link: '/alimento-medicamento',
  },
  {
    title: 'Localidades',
    caption: 'Listado de localidades',
    icon: 'mdi-home-city-outline',
    link: '/localidad',
  },
  {
    title: 'Medicamentos',
    caption: 'Listado de Medicamentos',
    icon: 'mdi-medication-outline',
    link: '/medicamento',
  },
  {
    title: 'Provincias',
    caption: 'Listado de Provincias',
    icon: 'mdi-map-outline',
    link: '/provincia',
  },
  {
    title: 'Ubicaciones',
    caption: 'Listado de Ubicaciones',
    icon: 'mdi-map-marker-outline',
    link: '/ubicacion',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
