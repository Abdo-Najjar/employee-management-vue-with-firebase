<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel grey lighten-4 black-text center">
            <h3>Register</h3>
            <form @submit.prevent="register">
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input v-model="email" type="email" id="email" />
                <label for="email">Email Address</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input v-model="password" type="password" id="password" />
                <label for="password">Password</label>
              </div>
              <button class="btn btn-large btn-extended grey lighten-4 black-text">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          localStorage.setItem("auth", true);
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>