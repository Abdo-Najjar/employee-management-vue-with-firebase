<template>
  <div>
    <form @submit.prevent="updateEmployee">
      <div class="input-field col s12">
        <input  v-model="employee.empId" type="text" id="empId" />
        <label class="active" for="empId">Enter ID</label>
      </div>

      <div class="input-field col s12">
        <input v-model="employee.name" type="text" id="name" />
        <label class="active" for="name">Enter Name</label>
      </div>

      <div class="input-field col s12">
        <input v-model="employee.department" type="text" id="department" />
        <label class="active" for="department">Enter Department</label>
      </div>

      <div class="input-field col s12">
        <input v-model="employee.position" type="text" id="position" />
        <label class="active" for="position">Enter Position</label>
      </div>

      <router-link :to="{name:'home'}" type="submit" class="btn gray">Back</router-link>
      <button type="submit" class="btn green">Update</button>
    </form>
  </div>
</template>

<script>
import db from "../../firebase/firestoreinit";

export default {
  name: "Edit",
  data() {
    return {
      employee: {
        empId: "",
        name: "",
        department: "",
        position: ""
      },
      docId: this.$route.params.id
    };
  },
  created() {
    db.collection("employees")
      .doc(this.docId)
      .get()
      .then(doc => {
        typeof doc.data() == "undefined"
          ? this.$router.push({ name: "notfound" })
          : (this.employee = doc.data());
      });
  },
  methods: {
    updateEmployee() {
      if (this.validateFeilds()) {
        db.collection("employees")
          .doc(this.docId)
          .update(this.employee).then(()=>{
            this.$router.push({name:'employee.show' , params:{id:this.docId}})
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