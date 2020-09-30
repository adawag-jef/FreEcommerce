<template>
  <div class="relative">
    <button
      @click="setDropDown(!dropdownOpen)"
      class="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
    >
      <img
        class="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=296&amp;q=80"
        alt="Your avatar"
      />
    </button>

    <div
      v-show="dropdownOpen"
      @click="setDropDown(false)"
      class="fixed inset-0 h-full w-full z-10"
      style="display: none;"
    ></div>

    <div
      v-show="dropdownOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
      style="display: none;"
    >
      <a
        href="#"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
        >Profile</a
      >
      <a
        href="/login"
        @click.prevent="logout"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
        >Logout</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dropdownOpen: { type: Boolean, default: false },
    setDropDown: { type: Function },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
