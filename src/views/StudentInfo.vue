<script setup lang="ts">
import { ref } from 'vue';
import Cookies from 'js-cookie'
let courses = ref()

 const columns = ['Index','Id','Name'];

const getStudentId = ():Number => {
    const path = window.location.pathname
    return Number(path.split("/")[2])
}

getStudentId()

const getCoursesByUser = async () => {
    const requestOptions = {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + Cookies.get('jwt') }
    };

    await fetch(`http://localhost:3000/course/student/` + getStudentId(),
        requestOptions)
        .then((r) => r.json())
        .then(data => {
            courses.value = data
        })
        .catch((e) => console.log('error',e));
};

getCoursesByUser()

</script>


<template>
<div class="min-h-full w-full items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-stone-100 rounded-md">
 <h1 class="text-blue-600 text-2xl pb-3">Courses</h1>
    <table v-if="courses.length > 0" class="table-auto border-collapse border border-slate-400 mx-auto">
      <thead>
        <tr>
          <th v-for="column in columns" class="border border-slate-300 px-3">
            {{column}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(course,index) in courses" >
          <td class="border border-slate-300 py-1 px-3">{{index}}</td>
          <td class="border border-slate-300 py-1 px-3">
            {{course.id}}
          </td>
          <td class="border border-slate-300 py-1 px-3">
            {{course.name}}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else>
        NO TIENE CURSOS

    </div>
</div>

</template>