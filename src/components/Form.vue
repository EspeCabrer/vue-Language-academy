<script>
    import { onMounted, ref } from 'vue';
export default {
    setup() {
        const name = ref('')
        const el = ref()

        const submitForm = () => {
            console.log(`Form submitted! Name = ${name.value}`)
        }

        onMounted(()=> {
            el.value.focus()
        })

        return {
            el,
            name,
            submitForm
        }
    },
};
</script>

<template>
    <div>
        <p class="text-3xl font-bold underline bg-rose-500">{{name}}</p>
        <input ref="el" type="text" placeholder="Name" v-model="name"/>
        <div>
            <button 
            @click="submitForm"
            v-bind:disabled="name.length == 0"
            >Submit</button>
        </div>
    </div>
</template>

<style>
input[type='text'] {
    padding: 5px;
}

button { 
    margin-top: 20px;
}

</style>