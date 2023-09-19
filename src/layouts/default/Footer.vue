<template>
  <v-footer class="bg-primary" height="1">
    <v-row justify="center" no-gutters>
      <v-btn v-for="link in links" :key="link" color="black" variant="text" class="mx-2" rounded="xl">
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        <p class="text">
         {{ new Date().getFullYear() }} — <strong>Human influencing lab</strong> 
        </p>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script lang="ts" setup>
const links: string[] = [
  'Home',
  'About us',
  'Account'
];
</script>