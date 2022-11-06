<script setup>
    let result;

    const post = await fetch(`http://localhost:3000/student`)
        .then((r) => r.json())
        .then(data => {
            result = data
            console.log({data})
        })
        .catch((e) => console.log('error', e));

        const showPost = () => {
            console.log('post',result)
        };
</script>


<template>
    <h1>Lista de profes</h1>
      <div>
        <p>
            {{result}}
        </p>

        <button 
            @click="showPost"
            >Submit
        </button>
        </div>
</template>
