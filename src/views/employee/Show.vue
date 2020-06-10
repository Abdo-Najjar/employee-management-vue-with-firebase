<template>
  <div id="view employee">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{employee.name}}</h4>
      </li>
      <li class="collection-item">Employee ID: {{employee.empId}}</li>
      <li class="collection-item">Department: {{employee.department}}</li>
      <li class="collection-item">Position: {{employee.position}}</li>
    </ul>
    <router-link class="btn gray" :to="{name:'home'}">Back</router-link>
    <button @click="destroy" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link :to="{name:'employee.edit' , params:{id:docId}}" class="btn-floating">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/firestoreinit";

export default {
  name: "Show",

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
  methods: {
    destroy() {
      if (confirm("Are you sure you want to delete it?")) {
        db.collection("employees")
          .doc(this.docId)
          .delete()
          .then(() => {
            this.$router.push({ name: "home" });
          });
      }
    }
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
  }
};
</script>

<style scoped></style>
