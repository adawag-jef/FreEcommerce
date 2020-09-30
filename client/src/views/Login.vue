<template>
  <div class="w-full h-screen flex">
    <img
      src="https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      alt="background"
      class="object-cover object-center h-screen w-7/12"
    />
    <form
      @submit.prevent="submitLogin"
      class="bg-white flex flex-col justify-center items-center w-5/12 shadow-lg"
    >
      <h1 class="text-3xl font-bold text-green-500 mb-2">LOGIN</h1>
      <div class="w-1/2 text-center">
        <input
          v-model="username"
          type="text"
          name="username"
          placeholder="username"
          autocomplete="off"
          class="shadow-md border w-full h-10 px-3 py-2 text-green-500 focus:outline-none focus:border-green-500 mb-3 rounded"
        />
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="password"
          autocomplete="off"
          class="shadow-md border w-full h-10 px-3 py-2 text-green-500 focus:outline-none focus:border-green-500 mb-3 rounded"
        />
        <button
          class="bg-green-500 hover:bg-green-600 w-full text-white px-3 py-1 rounded text-lg focus:outline-none shadow"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import authApi from "../api/authApi";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async submitLogin() {
      try {
        const success = await this.$store.dispatch("auth/login", {
          username: this.username,
          password: this.password,
        });
        if (success) {
          this.$router.push("/admin/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
