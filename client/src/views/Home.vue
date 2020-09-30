<template>
  <div>
    <h1>This is an home page</h1>
    <button @click="check">CLick me</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async check() {
      const res = await this.$store.dispatch("auth/currentUser");
      console.log(res);
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
