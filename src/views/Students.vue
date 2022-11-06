<script setup>
import { ref } from 'vue';
let students = ref()
let firstNameNewStudent = ref('');
let lastNameNewStudent = ref('');

const getStudents = async () => {
    await fetch(`http://localhost:3000/student`)
        .then((r) => r.json())
        .then(data => {
            students.value = data
        })
        .catch((e) => console.log('error', e));
}

const addStudent = async () => {

    console.log('added')

    const URL = `http://localhost:3000/student`;
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstName: firstNameNewStudent.value,
            lastName: lastNameNewStudent.value
        })
    };

        await fetch(URL, requestOptions)
        .then((res) => res.json())
            .then(data => {
            console.log({data})
            getStudents();
        })
        .catch((e) => console.log(e));
}

getStudents();



const columns = ['Index','Id','First Name','Second Name','Actions '];
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
           <a href="#modal" @click="edit(index)"><button class="bg-yellow-500">edit</button>
            </a>
            <a href="#!" @click="archive(index)" class="bg-orange-700" >Delete</a>
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

    <!-- <table class="table-responsive centered bordered striped highlight z-depth-1 hoverable" v-show="bin.length">
      <thead>
        <tr>
          <th v-for="column in columns">
            {{column}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(person,index) in bin">
          <td>{{index}}</td>
          <td>
            {{person.lname}}
          </td>
          <td>
            {{person.fname}}
          </td>
          <td>
            {{person.age}} years
          </td>
          <td>
            {{person.job}}
          </td>
          <td>
            {{person.address}}
          </td>
          <td>
            <a href="#!" @click="restore(index)" class="btn waves-effect waves-light blue darken-2"><i class="material-icons">restore</i>
            </a>
            <a href="#!" @click="deplete(index)" class="btn waves-effect waves-light red darken-2"><i class="material-icons">delete</i>
            </a>
          </td>
        </tr>
      </tbody>
    </table> -->
</div>
</template>
