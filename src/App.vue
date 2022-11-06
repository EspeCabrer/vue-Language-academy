<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue';
import Form from './components/Form.vue';
import TeacherList from './views/TeacherList.vue';
import NavBar from './components/NavBar.vue';
import SignIn from './views/SignIn.vue';

</script>

<template>
  <NavBar/>
  
<div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <Suspense>
    <router-view/>
  </Suspense>
</div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
