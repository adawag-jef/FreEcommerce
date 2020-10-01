<template>
  <div>
    <div class="flex justify-between">
      <h3 class="text-gray-700 text-3xl font-medium">Category Management</h3>
      <button
        class="flex items-center mt-4 px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
      >
        Add Category
      </button>
    </div>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoryList from "../components/CategoryList";
export default {
  components: {
    CategoryList,
  },
  computed: {
    ...mapGetters({ categories: "category/getCategories" }),
  },
  mounted() {
    this.$store.dispatch("category/listCategories");
  },
};
</script>

<style></style>
