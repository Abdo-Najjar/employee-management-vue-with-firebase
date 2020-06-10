<template>
  <div>
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>

      <li class="collection-item" :key='employee.id' v-for="employee in employees">
          <div class="chip">
              {{employee.department}}
          </div>
          {{`${employee.empId}:  ${employee.name}`}}

          
          <router-link class="secondary-content" :to="{name:'employee.show' , params:{id:employee.id}}">
            <i class="fa fa-eye"></i>
          </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link :to="{ name:'employee.create'}" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "../firebase/firestoreinit";

export default {
  name: "Dashboard",

  data() {
    return {
      employees: []
    };
  },

  async created() {

    const employeeDocs = await db.collection("employees").orderBy('department').get();
    
    
    employeeDocs.docs.forEach(doc => {
    
        this.employees.unshift({ id: doc.id, ...doc.data() });
    });
  },
  mounted(){

  }
};
</script>

<style scoped>
</style>