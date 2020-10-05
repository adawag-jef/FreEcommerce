<template>
  <div>
    <div class="flex justify-between">
      <h3 class="text-gray-700 text-3xl font-medium">Site Management</h3>
      <button
        class="flex items-center mt-4 px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
        @click="$router.push('/')"
      >
        View Website
      </button>
    </div>
    <UserList />
  </div>
</template>

<script>
import UserList from "../components/UserList";
export default {
  components: {
    UserList,
  },
};
</script>

<style></style>
