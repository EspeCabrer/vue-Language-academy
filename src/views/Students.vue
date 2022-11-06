<script setup>
    import { ref } from 'vue';
    let students = ref()
    let firstNameNewStudent = ref('');
    let lastNameNewStudent = ref('');

    let updatedStudentId;

    let editFirstName = ref('')
    let editLastName = ref('')
    
    let isModal = ref(false);

    const columns = ['Index','Id','First Name','Second Name','Actions '];

    const getStudents = async () => {
        await fetch(`http://localhost:3000/student`)
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
            headers: { "Content-Type": "application/json" },
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
            headers: { "Content-Type": "application/json" },
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

<div class="min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-100">
 <h1 class="text-blue-600 text-2xl">Student list</h1>
    <table>
      <thead>
        <tr>
          <th v-for="column in columns">
            {{column}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student,index) in students">
          <td>{{index}}</td>
          <td>
            {{student.id}}
          </td>
          <td>
            {{student.firstName}}
          </td>
          <td>
            {{student.lastName}}
          </td>
         
           <td style="width: 18%;">
           <a @click="editModal(student.id); isModal = !isModal"><button class="bg-yellow-500">edit</button>
            </a>
            <a href="#!" @click="archive(student.id)" class="bg-orange-700">Delete</a>
           </td>
        </tr>

        <tr>
          <td colspan="2" class="input-field">
            <div class="input-field">
              <input placeholder="First name" v-model="firstNameNewStudent" id="fname" type="text">
            </div>
          </td>
          <td>
            <div class="input-field">
              <input placeholder="Last name" v-model="lastNameNewStudent" id="lname" type="text">
            </div>
          </td>
        
          <td><a href="#!" @click="addStudent" class="bg-green-500"><i class="material-icons">add</i></a></td>
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
