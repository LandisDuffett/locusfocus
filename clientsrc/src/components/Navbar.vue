<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-success">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item m-2" :class="{ active: $route.name == 'home' }">
          <router-link :to="{ name: 'home' }" class="nav-link"
            ><h4>Home</h4></router-link
          >
        </li>
        <li
          class="nav-item m-2"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'create' }"
        >
          <router-link class="nav-link" :to="{ name: 'create' }"
            >Create lists</router-link
          >
        </li>
        <li
          class="nav-item m-2"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'setup' }"
        >
          <router-link class="nav-link" :to="{ name: 'setup' }"
            >Set up study session</router-link
          >
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-info rounded shadow border"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >
          Login
        </button>
        <button
          class="btn btn-danger rounded shadow border"
          @click="logout"
          v-else
        >
          logout
        </button>
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    async logout() {
      await this.$auth.logout({ returnTo: window.location.origin });
    },
  },
};
</script>

<style></style>
