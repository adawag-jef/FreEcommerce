<template>
  <div>
    <h3 class="text-gray-700 text-3xl font-medium">Dashboard</h3>
    <p>USER ID: {{ userId }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: 0,
    };
  },
  mounted() {
    this.userId = this.$route.params.id;
  },
};
</script>

<style></style>
