<script setup lang="ts">
import { Ref, ref } from 'vue';

const title: string = "Login form";
let email: Ref<string> = ref('');
let password: Ref<string> = ref('')


const handleSubmit = () => {
    console.log('Looogin: ' + email.value + ' ' + password.value);
}



</script>
<template>
    <form @submit.prevent="handleSubmit">
        <h1>{{title}}</h1>
        <input type="email" v-model="email"/>
        <input type="password" v-model = "password"/>
        <button v-bind:disabled="email.length == 0">Log in</button>
    </form>
</template>
<style></style>