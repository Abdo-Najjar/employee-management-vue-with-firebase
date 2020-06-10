<template>
  <div>
    <nav>
      <div class="nav-wrapper green">
        <div class="container">
          <router-link to="/" class="brand-logo">Employee Manager</router-link>
          <a href="#" class="sidenav-trigger" data-target="mobile-nav">
            <i class="material-icons">menu</i>
          </a>
          <ul class="right hide-on-med-and-down">
            <li v-if="authenticated">
              <router-link :to="{name:'home'}">Dashboard</router-link>
            </li>

            <li v-if="!authenticated">
              <router-link :to="{name:'login'}">Login</router-link>
            </li>

            <li v-if="!authenticated">
              <router-link :to="{name:'register'}">Register</router-link>
            </li>

            <li v-if="authenticated" @click="logout">
              <button class="btn black">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-nav">
      <li v-if="authenticated">
        <router-link :to="{name:'home'}">Dashboard</router-link>
      </li>

      <li v-if="!authenticated">
        <router-link :to="{name:'login'}">Login</router-link>
      </li>

      <li v-if="!authenticated">
        <router-link :to="{name:'register'}">Register</router-link>
      </li>

      <li v-if="authenticated" @click="logout">
        <a href="#">
          <button class="btn black">Logout</button>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "NavBar",
  data() {
    return {
      authenticated: true
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch(error => {
          alert(error.message);
        });

      localStorage.removeItem("auth");
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      !user ? (this.authenticated = false) : (this.authenticated = true);
    });
  }
};
</script>

<style scoped>
nav {
  margin-bottom: 10px;
}
</style>