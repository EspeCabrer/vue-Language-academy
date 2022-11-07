<script setup lang="ts">
import { Ref, ref } from 'vue';
import Cookies from 'js-cookie'

interface Course {
    name: String,
    id: Number,
    UpdatedAt: Date,
    CreatedAt: Date
}

let studentCourses: Ref = ref()
let allCourses = ref()
const columns: String[] = ['Index','Id','Name'];
let selectedCourse = ref({name: 'Select course', id: 0})
let showDropdown = ref<boolean>(false)

const getStudentId = ():Number => {
    const path: String = window.location.pathname
    return Number(path.split("/")[2])
}

const getCoursesByUser = async (getStudentId: () => Number): Promise<void> => {

    const URL: RequestInfo = `http://localhost:3000/course/student/`
    
    const requestOptions: RequestInit = {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + Cookies.get('jwt') },
    };

    const id = getStudentId();

    await fetch(`${URL}${id}`,
        requestOptions)
        .then((r) => r.json())
        .then(data => {
            studentCourses.value = data
        })
        .catch((e) => console.log('error',e));
};

const getAllCourses = async (): Promise<void> => {

     const URL: RequestInfo = `http://localhost:3000/course`

     const requestOptions: RequestInit = {
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + Cookies.get('jwt') },
    };

    await fetch(URL, requestOptions)
        .then((r) => r.json())
        .then(data => {
            allCourses.value = data
        })
        .catch((e) => console.log('error',e));
};

const addCourse = async () => {
    const URL: RequestInfo = `http://localhost:3000/student/add-course`

    const studentId:Number = getStudentId();

    const requestOptions: RequestInit = {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get('jwt'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ studentId: studentId, courseId: selectedCourse.value.id})
    };
    
    await fetch(URL, requestOptions)
        .then((r) => r.json())
        .then(data => {
            getCoursesByUser(getStudentId);
        })
        .catch((e) => console.log('error',e));
    }

const selectCourse = (id: Number) => {
    if (allCourses)
    selectedCourse.value = allCourses.value.find((course: Course) => course.id === id);
    showDropdown.value = false;

}
    getCoursesByUser(getStudentId);
    getAllCourses();

</script>


<template>
<div class="min-h-full w-full items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-stone-100 rounded-md">
 <h1 class="text-blue-600 text-2xl pb-3">Courses</h1>
    <table v-if="studentCourses.length > 0" class="table-auto border-collapse border border-slate-400 mx-auto">
      <thead>
        <tr>
          <th v-for="column in columns" class="border border-slate-300 px-3">
            {{column}}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(course,index) in studentCourses" >
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

    <div>
        <label id="listbox-label" class="block text-sm font-medium text-gray-700">Add course</label>
        <div class="relative mt-1">
            <button @click="() => showDropdown = !showDropdown"
                type="button" 
                class="relative w-full cursor-default rounded-md border 
                border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 
                focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" 
                aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span class="flex items-center">
                    <span class="ml-3 block truncate">{{selectedCourse.name}}</span>
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <!-- Heroicon name: mini/chevron-up-down -->
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                    </svg>
                </span>
            </button>

            <ul v-show="showDropdown"
            class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md 
            bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 
            focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                <li v-for="(course,index) in allCourses"
                    class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" 
                    @click="selectCourse(course.id)"  role="option">
                    {{course.name}}
                </li>
            </ul>
        </div>
        <!-- Using utilities: -->
        <button @click="addCourse"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3 ">
            Add
        </button>

    </div>
</div>
</template>