<template>
  <div class="row">
    <div class="col s12">
      <form @submit.prevent="storeEmployee">
        <div class="input-field col s12">
          <input v-model="employee.empId" type="text" id="empId" />
          <label for="empId">Enter ID</label>
        </div>

        <div class="input-field col s12">
          <input v-model="employee.name" type="text" id="name" />
          <label for="name">Enter Name</label>
        </div>

        <div class="input-field col s12">
          <input v-model="employee.department" type="text" id="department" />
          <label for="department">Enter Department</label>
        </div>

        <div class="input-field col s12">
          <input v-model="employee.position" type="text" id="position" />
          <label for="position">Enter Position</label>
        </div>

        <router-link :to="{name:'home'}" type="submit" class="btn gray">Back</router-link>
        <button type="submit" class="btn green">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/firestoreinit";

export default {
  name: "Create",
  data() {
    return {
      employee: {
        empId: "",
        name: "",
        department: "",
        position: ""
      }
    };
  },
  methods: {
    storeEmployee() {
      if (this.validateFeilds()) {
        db.collection("employees")
          .add(this.employee)
          .then(doc => {
            this.$router.push({
              name: "employee.show",
              params: { id: doc.id }
            });
          });
      }
    },
    validateFeilds() {
      for (const key in this.employee) {
        if (this.employee[key] == "") {
          alert("Check your inputs!");
          return false;
        }

        if (isNaN(this.employee.empId)) {
          alert("ID must be a number!");
          return false;
        }
      }
      return true;
    }
  }
};
</script>

<style scoped>
</style>