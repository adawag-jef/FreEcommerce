<template>
  <div>
    <div class="flex justify-between">
      <h3 class="text-gray-700 text-3xl font-medium">Dashboard</h3>
      <button
        class="rounded-sm bg-green-600 text-white px-3 py-1 focus:outline-none hover:bg-green-400 hover:text-gray-300"
        @click="$router.push('/')"
      >
        View Website
      </button>
    </div>
    <Status />
  </div>
</template>

<script>
import Status from "../components/Status";
export default {
  components: {
    Status,
  },
};
</script>

<style></style>
