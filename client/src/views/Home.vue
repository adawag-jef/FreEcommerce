<template>
  <div>
    <h1>Home Page</h1>
    <button
      v-if="$store.state.auth.isAuthenticated"
      class="bg-blue-400 hover:bg-blue-200 px-3 py-2 text-white shadow-outline focus:outline-none"
      @click="logout"
    >
      Logout
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
