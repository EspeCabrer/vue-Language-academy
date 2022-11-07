<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
<NavBar/>
  
<div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <Suspense>
    <router-view/>
  </Suspense>
</div>

</template>


