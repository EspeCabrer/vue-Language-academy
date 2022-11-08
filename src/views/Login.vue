<script setup lang="ts">
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import { Ref,ref } from 'vue';
import Cookies from 'js-cookie';
let email: Ref<string> = ref('');
let password: Ref<string> = ref('')
let err: Ref<null | string> = ref(null);


const handleSubmit = async (): Promise<void>  => {

    const URL: RequestInfo = `http://localhost:3000/auth/login`;

    const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value})
    };

    await fetch(URL, requestOptions)
        .then(res => res.json())
        .then(data => { 
            if (data.message) err.value = data.message
          if (data.token) {
            Cookies.set('jwt',data.token);
            redirectToListStudentPage();
          }
        })
        .catch(error => console.error( error ))  
}

const redirectToListStudentPage = (): void => {
  console.log('holi')
    window.location.pathname = "/students"
};


</script>
<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-600 rounded-md">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-slate-200">Login in to your account</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" v-model="email" autocomplete="email" required="true" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" v-model="password" autocomplete="current-password" required="true" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
          </div>
        </div>
        <div>
          <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent 
          bg-slate-200 py-2 px-4 text-sm font-medium text-slate-700 hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-slate-700 group-hover:text-slate-900" aria-hidden="true" />
            </span>
            Log in
          </button>
          <p>{{ err }}</p>
        </div>
      </form>
    </div>
  </div>
</template>