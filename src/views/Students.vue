<script setup>
    import { ref } from 'vue';
    import Cookies from 'js-cookie'
    let students = ref()
    let firstNameNewStudent = ref('');
    let lastNameNewStudent = ref('');

    let updatedStudentId;

    let editFirstName = ref('')
    let editLastName = ref('')
    
    let isModal = ref(false);

    const columns = ['Index','Id','First Name','Second Name','Actions '];

    const getStudents = async () => {

         const requestOptions = {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + Cookies.get('jwt')}
        };

        await fetch(`http://localhost:3000/student`, requestOptions)
            .then((r) => r.json())
            .then(data => {
                students.value = data
            })
            .catch((e) => console.log('error', e));
    }

    const addStudent = async () => {
        
        const URL = `http://localhost:3000/student`;
        const requestOptions = {
            method: "POST",
            headers: { 'Authorization': 'Bearer ' + Cookies.get('jwt')},
            body: JSON.stringify({
                firstName: firstNameNewStudent.value,
                lastName: lastNameNewStudent.value
            })
        };

            await fetch(URL , requestOptions)
            .then((res) => res.json())
                .then(data => {
                getStudents();
            })
            .catch((e) => console.log(e));
    }

    const updateStudent = async () => {
        const URL = `http://localhost:3000/student`;
        const requestOptions = {
            method: "PUT",
             headers: { 'Authorization': 'Bearer ' + Cookies.get('jwt')},
            body: JSON.stringify({
                firstName: editFirstName.value,
                lastName: editLastName.value
            })
        };

            await fetch(`${URL}/${updatedStudentId}`, requestOptions)
            .then((res) => res.json())
                .then(data => {
                    getStudents();
            })
                .catch((e) => console.log(e));
    }

const deleteStudent = async (id) => {
     const URL = `http://localhost:3000/student`;
        const requestOptions = {
            method: "DELETE",
             headers: { 'Authorization': 'Bearer ' + Cookies.get('jwt')}
        };

            await fetch(`${URL}/${id}`, requestOptions)
            .then((res) => res.json())
                .then(data => {
                    getStudents();
            })
                .catch((e) => console.log(e));
        
    }

    const editModal = (id) => {
        updatedStudentId = id;
            for (let student of students.value) {
                if (student.id == id) {
                    editFirstName.value = student.firstName
                    editLastName.value = student.lastName
                }
            }
        isModal = true;
        }

    getStudents();

</script>

<template>

<div class="min-h-full w-full items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-stone-100 rounded-md">
 <h1 class="text-blue-600 text-2xl">Student list</h1>
    <table class="table-auto border-collapse border border-slate-400 mx-auto">
      <thead>
        <tr>
          <th v-for="column in columns" class="border border-slate-300 px-3">
            {{column}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student,index) in students">
          <td class="border border-slate-300 py-1 px-3">{{index}}</td>
          <td class="border border-slate-300 py-1 px-3">
            {{student.id}}
          </td>
          <td class="border border-slate-300 py-1 px-3">
            {{student.firstName}}
          </td>
          <td class="border border-slate-300 py-1 px-3">
            {{student.lastName}}
          </td>
         
           <td class="border border-slate-300 py-1 px-3" style="width: 18%;">
            <div class="flex justify-evenly">
                <div class="cursor-pointer" @click="editModal(student.id); isModal = !isModal">    
                     <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 110.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z"/></svg>     
                 </div>
                 <div class="cursor-pointer" @click="deleteStudent(student.id)">
                     <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                 </div>
            </div>
           </td>
        </tr>

        <tr>
          <td colspan="2" class="input-field">
            <div>
              <input 
               class="mt-2 p-2 block w-full rounded-md border-gray-300 border-2
                                        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-transparent"
              placeholder="First name" v-model="firstNameNewStudent" id="fname" type="text">
            </div>
          </td>
          <td>
            <div>
              <input class="mt-2 p-2 block w-full rounded-md border-gray-300 border-2
                                        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-transparent"
              placeholder="Last name" v-model="lastNameNewStudent" id="lname" type="text">
            </div>
          </td>
        
          <td class="py-1 px-3">
            <div @click="addStudent" class="flex justify-center cursor-pointer">
                <svg width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
            </div>
        </td>    
        </tr>
      </tbody>
    </table>

</div>

<!-- MODAL -->
  <div class="relative z-10 modal" aria-labelledby="modal-title"  v-show="isModal">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">  
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Update student</h3>
                <div class="mt-2">
                    <form >
                        <div class="bg-white px-4 py-5 sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                                    <input type="text" id="first-name" v-model="editFirstName"
                                        class="mt-2 p-2 block w-full rounded-md border-gray-300 border-2 shadow-sm 
                                        focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                                    <input type="text" id="last-name" v-model="editLastName"
                                        class="mt-2 p-2 block w-full rounded-md border-gray-300 border-2
                                        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="button" 
                @click="updateStudent(); isModal = false;"
                class="inline-flex w-full 
                justify-center rounded-md border border-transparent 
                bg-blue-600 px-4 py-2 text-base font-medium text-white 
                shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                Edit
            </button>
            <button type="button" 
                @click="() => isModal = false"
                class="mt-3 inline-flex w-full justify-center rounded-md border 
                border-gray-300 bg-white px-4 py-2 text-base 
                font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 
                focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
            </button>
            </div>
        </div>
        </div>
    </div>
</div>
</template>
