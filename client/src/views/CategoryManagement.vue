<template>
  <div>
    <div class="flex justify-between">
      <h3 class="text-gray-700 text-3xl font-medium">Category Management</h3>
      <FormModal
        :trigger="isOpen"
        :onCloseRequest="onCloseRequest"
        :onSubmitRequest="submit"
      >
        <template slot="trigger">
          <button
            @click="isOpen = !isOpen"
            class="flex items-center mt-4 px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
          >
            Add Category
          </button>
        </template>
        <template slot="header">
          <div>
            <i class="fas fa-exclamation-circle text-blue-500"></i>
            <span class="font-bold text-gray-700 text-lg">Add Category</span>
          </div>
        </template>

        <template slot="body">
          <input
            v-model="category.name"
            type="text"
            name="name"
            placeholder="Category Name"
            autocomplete="off"
            class="shadow-md border w-full h-10 px-3 py-2 text-green-500 focus:outline-none focus:border-green-500 mb-3 rounded"
          />
          <textarea
            v-model="category.description"
            style="resize: none"
            type="text"
            name="description"
            placeholder="Category Description"
            class="shadow-md border w-full h-20 px-3 py-2 text-green-500 focus:outline-none focus:border-green-500 mb-3 rounded"
          ></textarea>
        </template>
        <template slot="action">
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex items-center px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
            >
              <i class="far fa-paper-plane"></i>
              <span class="ml-2">{{
                isSubmitting ? "Submitting..." : "Submit"
              }}</span>
            </button>
          </div>
        </template>
      </FormModal>
    </div>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoryList from "../components/CategoryList";
import FormModal from "../components/FormModal";
export default {
  components: {
    CategoryList,
    FormModal,
  },
  data() {
    return {
      isOpen: false,
      isSubmitting: false,
      category: {
        name: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapGetters({ categories: "category/getCategories" }),
  },
  mounted() {
    this.$store.dispatch("category/listCategories");
  },
  methods: {
    onCloseRequest() {
      this.isOpen = false;
    },
    async submit(e) {
      const response = await this.$store.dispatch(
        "category/createCategory",
        this.category
      );
      if (response) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style></style>
